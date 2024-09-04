import express from 'express';
import { addProject, getProjects, updateProjectStatus } from '../controllers/projectController.js';

const router = express.Router();
 
router.post('/', addProject);
router.get('/', getProjects);
router.put('/:id/status', updateProjectStatus);

export default router;
