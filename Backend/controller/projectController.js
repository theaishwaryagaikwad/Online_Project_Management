import Project from "../model/projectModel.js";
import jwt from "jsonwebtoken";

async function createProject(req, res) {
  try {
    const newProject = new Project(req.body);
    const project = await projectService.createProject(req.body);
    res
      .status(200)
      .json(project)
      .send({ message: "Register Successful", task: project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllProject(req, res) {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProjectById(req, res) {
  try {
    const { email, password } = req.body;
    const Project = await Project.findOne({ email });
    if (!Project) {
      return res.status(404).send({ message: "Project not found" });
    }

    const isMatch = await Project.passwordCompare(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ _id: Project._id }, "aishwarya", {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "Authentication successful",
      accessedToken: token,
      ProjectId: Project._id,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error during authentication", error: error.message });
  }
}

async function updateProject(req, res) {
  try {
    if (
      req.body.projectStatus &&
      !["Registered", "Running", "Closed", "Cancelled"].includes(
        req.body.projectStatus
      )
    ) {
      return res.status(400).json({ error: "Invalid project status" });
    }
    const project = await Project.find(req.params.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteProject(req, res) {
  try {
    await Project.find(req.params.id);
    res.status(200).send({ message: "Project Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
};
