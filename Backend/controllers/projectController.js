import Project from '../model/projectModel.js'

export const addProject = async (req, res) => {
  const { name, reason, type, division, category,priority,startDate,endDate,location,details,status} = req.body;

  try {
    const project = new Project({ name, reason, type, division, category,priority,startDate,endDate,location,details,status });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProjects = async (req, res) => {
  const { search, sortBy, page = 1, limit = 10 } = req.query;

  try {
    const query = search ? { name: new RegExp(search, 'i') } : {};
    const sort = sortBy ? { [sortBy]: 1 } : {};
    const projects = await Project.find(query).sort(sort).skip((page - 1) * limit).limit(Number(limit));
    const total = await Project.countDocuments(query);
    
    res.json({
      projects,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProjectStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(id, { status }, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
