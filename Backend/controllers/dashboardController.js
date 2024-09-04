import Project from '../model/projectModel.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const statusCounts = await Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const departmentStats = await Project.aggregate([
      { $group: { _id: '$department', total: { $sum: 1 } } },
    ]);

    res.json({
      totalProjects,
      statusCounts,
      departmentStats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
