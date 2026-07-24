import Product from '../models/Product.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryUpload.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, discountPrice } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // file.path contains the local path, e.g. "uploads\image.jpg"
        // Convert to a web-accessible URL
        const imageUrl = `http://localhost:5000/uploads/${file.filename}`;
        images.push({
          url: imageUrl,
          public_id: file.filename, // Use filename as public_id for local deletion
        });
      }
    }

    const discountPercentage = discountPrice && price ? Math.round(((price - discountPrice) / price) * 100) : 0;

    const product = new Product({
      name,
      price,
      description,
      category,
      brand,
      stock,
      images,
      discountPrice,
      discountPercentage,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, discountPrice } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.stock = stock || product.stock;
      product.discountPrice = discountPrice || product.discountPrice;
      
      product.discountPercentage = product.discountPrice && product.price 
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
        : 0;

      if (req.files && req.files.length > 0) {
        // Delete old local images
        if (product.images && product.images.length > 0) {
          for (const img of product.images) {
            try {
              const fs = await import('fs');
              const path = await import('path');
              const filePath = path.join(process.cwd(), 'uploads', img.public_id);
              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
            } catch (e) {
              console.error('Error deleting local image:', e);
            }
          }
        }
        
        // Add new images
        let images = [];
        for (const file of req.files) {
          const imageUrl = `http://localhost:5000/uploads/${file.filename}`;
          images.push({
            url: imageUrl,
            public_id: file.filename,
          });
        }
        product.images = images;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.images && product.images.length > 0) {
        for (const img of product.images) {
          try {
            // Delete local file if it exists
            const fs = await import('fs');
            const path = await import('path');
            const filePath = path.join(process.cwd(), 'uploads', img.public_id);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          } catch (e) {
            console.error('Error deleting local image:', e);
          }
        }
      }
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
