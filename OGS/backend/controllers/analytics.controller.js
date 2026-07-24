import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get admin dashboard analytics
// @route   GET /api/analytics
// @access  Private/Admin
export const getAnalytics = async (req, res) => {
  try {
    // Basic stats
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    
    // Revenue
    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    // Recent orders
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    // Low stock products
    const lowStockAlerts = await Product.find({ stock: { $lt: 10 } })
      .sort({ stock: 1 })
      .limit(5);

    // Sales over time (last 6 months, simplified grouping)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const salesData = await Order.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo }, isPaid: true } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalPrice" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format sales data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedSalesData = salesData.map(data => ({
      name: months[data._id - 1],
      revenue: data.revenue,
      sales: data.count
    }));

    // Best selling products (placeholder based on rating for now, or you could aggregate from orderItems)
    const bestSellers = await Product.find({})
      .sort({ rating: -1, numReviews: -1 })
      .limit(5);

    res.json({
      totalRevenue,
      totalOrders,
      totalUsers,
      totalProducts,
      recentOrders,
      lowStockAlerts,
      salesData: formattedSalesData,
      bestSellers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
