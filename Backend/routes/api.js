import express from 'express';
import authMiddleware from '../middleware/auth.js';
import userController from '../controller/userController.js';
import  projectController from '../controller/projectController.js';

const router = express.Router();

router.post('/registerUser', userController.registerUser);
router.post('/loginUser', userController.loginUser);

router.post('/createProject', projectController.createProject);
router.get('/getAllProject', projectController.getAllProject);
router.put('/updateProject/:id', projectController.updateProject); 
router.delete('/deleteProject/:id', projectController.deleteProject);

export default router;
