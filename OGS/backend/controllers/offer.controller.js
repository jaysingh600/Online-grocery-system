import Offer from '../models/Offer.js';
// order controller
// @desc    Get all offers
// @route   GET /api/offers
// @access  Public
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({}).populate('applicableCategory', 'name');
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get active offers
// @route   GET /api/offers/active
// @access  Public
export const getActiveOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true, expiryDate: { $gte: new Date() } }).populate('applicableCategory', 'name');
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an offer
// @route   POST /api/offers
// @access  Private/Admin
export const createOffer = async (req, res) => {
  try {
    const { title, discountPercentage, isActive, expiryDate, flashSale, applicableCategory } = req.body;
    let banner = { url: '', public_id: '' };

    if (req.file) {
      banner = {
        url: `http://localhost:5000/uploads/${req.file.filename}`,
        public_id: req.file.filename,
      };
    } else {
      return res.status(400).json({ message: 'Banner image is required' });
    }

    const offer = new Offer({
      title,
      banner,
      discountPercentage,
      isActive: isActive === 'true' || isActive === true,
      expiryDate,
      flashSale: flashSale === 'true' || flashSale === true,
      applicableCategory: applicableCategory || null,
    });

    const createdOffer = await offer.save();
    res.status(201).json(createdOffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an offer
// @route   PUT /api/offers/:id
// @access  Private/Admin
export const updateOffer = async (req, res) => {
  try {
    const { title, discountPercentage, isActive, expiryDate, flashSale, applicableCategory } = req.body;
    const offer = await Offer.findById(req.params.id);

    if (offer) {
      offer.title = title || offer.title;
      offer.discountPercentage = discountPercentage || offer.discountPercentage;
      if (isActive !== undefined) offer.isActive = isActive === 'true' || isActive === true;
      offer.expiryDate = expiryDate || offer.expiryDate;
      if (flashSale !== undefined) offer.flashSale = flashSale === 'true' || flashSale === true;
      if (applicableCategory !== undefined) offer.applicableCategory = applicableCategory === '' ? null : applicableCategory;

      if (req.file) {
        // Skip deletion for now
        offer.banner = {
          url: `http://localhost:5000/uploads/${req.file.filename}`,
          public_id: req.file.filename,
        };
      }

      const updatedOffer = await offer.save();
      res.json(updatedOffer);
    } else {
      res.status(404).json({ message: 'Offer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an offer
// @route   DELETE /api/offers/:id
// @access  Private/Admin
export const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (offer) {
      // Skip deletion for now
      await offer.deleteOne();
      res.json({ message: 'Offer removed' });
    } else {
      res.status(404).json({ message: 'Offer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
