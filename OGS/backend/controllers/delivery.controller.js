import Delivery from '../models/Delivery.js';
import Order from '../models/Order.js';
// delivery contro
// @desc    Assign delivery person to order
// @route   POST /api/deliveries
// @access  Private/Admin
export const assignDelivery = async (req, res) => {
  const { orderId, deliveryPersonId, notes } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const existingDelivery = await Delivery.findOne({ order: orderId });
    if (existingDelivery) {
      return res.status(400).json({ message: 'Delivery already assigned for this order' });
    }

    const delivery = new Delivery({
      order: orderId,
      deliveryPerson: deliveryPersonId,
      notes
    });

    const createdDelivery = await delivery.save();
    
    // Update order status to out for delivery if appropriate, or just keep as is
    order.status = 'Out for Delivery';
    await order.save();

    res.status(201).json(createdDelivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get deliveries for logged in delivery person
// @route   GET /api/deliveries/my-deliveries
// @access  Private/Delivery
export const getMyDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ deliveryPerson: req.user._id }).populate('order');
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update delivery status
// @route   PUT /api/deliveries/:id/status
// @access  Private/Delivery
export const updateDeliveryStatus = async (req, res) => {
  const { deliveryStatus, notes } = req.body;

  try {
    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    // Check if user is authorized to update this delivery
    if (delivery.deliveryPerson.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
       return res.status(401).json({ message: 'Not authorized' });
    }

    delivery.deliveryStatus = deliveryStatus || delivery.deliveryStatus;
    if (notes) {
        delivery.notes = notes;
    }

    if (deliveryStatus === 'Delivered') {
        delivery.deliveryDate = Date.now();
        
        // Also update the order status
        const order = await Order.findById(delivery.order);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            order.status = 'Delivered';
            await order.save();
        }
    }

    const updatedDelivery = await delivery.save();
    res.json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all deliveries
// @route   GET /api/deliveries
// @access  Private/Admin
export const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({}).populate('order').populate('deliveryPerson', 'id name email');
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
