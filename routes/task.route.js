import express from 'express';
import { createTask } from '../controllers/task.controller.js';

const router = express.Router();

router.route("/createTask").post(createTask);

export default router;