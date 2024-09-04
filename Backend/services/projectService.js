import Project from '../model/projectModel.js';

export const createProject = async (projectData) => {
    try {
        const project = new Project(projectData);
        await project.save();
        return project;
    } catch (error) {
        throw new Error('Error creating project: ' + error.message);
    }
};

export const getAllProjects = async () => {
    try {
        const projects = await Project.find();
        return projects;
    } catch (error) {
        throw new Error('Error retrieving projects: ' + error.message);
    }
};

export const getProjectById = async (projectId) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }
        return project;
    } catch (error) {
        throw new Error('Error retrieving project: ' + error.message);
    }
};

export const updateProject = async (projectId, updateData) => {
    try {
        if (updateData.projectStatus && !['Registered', 'Running', 'Closed', 'Cancelled'].includes(updateData.projectStatus)) {
            throw new Error('Invalid project status');
        }

        const project = await Project.findByIdAndUpdate(projectId, updateData, { new: true });
        if (!project) {
            throw new Error('Project not found');
        }
        return project;
    } catch (error) {
        throw new Error('Error updating project: ' + error.message);
    }
};

export const deleteProject = async (projectId) => {
    try {
        const project = await Project.findByIdAndDelete(projectId);
        if (!project) {
            throw new Error('Project not found');
        }
        return project;
    } catch (error) {
        throw new Error('Error deleting project: ' + error.message);
    }
};
