import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/ogc').then(async () => {
  const Offer = mongoose.model('Offer', new mongoose.Schema({
    discountPercentage: Number,
    applicableCategory: mongoose.Schema.Types.ObjectId,
    isActive: Boolean,
    expiryDate: Date
  }, { collection: 'offers' }));
  
  const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
    discountPercentage: Number,
    discountPrice: Number,
    category: mongoose.Schema.Types.ObjectId
  }, { collection: 'products' }));
  
  const activeOffers = await Offer.find({ isActive: true, expiryDate: { $gte: new Date() } });
  let products = await Product.find({}).limit(5).populate('category').lean();
  
  if (activeOffers.length > 0) {
    products = products.map(product => {
      const productDiscount = product.discountPercentage || 0;
      const applicableOffers = activeOffers.filter(o => {
        if (!o.applicableCategory) return true;
        if (!product.category) return false;
        return o.applicableCategory.toString() === (product.category._id || product.category).toString();
      });
      
      const maxApplicableDiscount = applicableOffers.reduce((max, offer) => Math.max(max, offer.discountPercentage), 0);
      if (maxApplicableDiscount > productDiscount) {
        const discountAmount = (product.price * maxApplicableDiscount) / 100;
        product.discountPrice = product.price - discountAmount;
        product.discountPercentage = maxApplicableDiscount;
      }
      return product;
    });
  }
  console.log(JSON.stringify(products, null, 2));
  process.exit();
});
