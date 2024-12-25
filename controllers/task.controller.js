import Task from '../models/task.model.js';

export const createTask = async (req, res) => {
    try {
        console.log("Received request:", req.body);

        const { title, description, email, startTime, endTime } = req.body;

        if (!title || !description || !email) {
            return res.status(400).json({ message: 'Please fill All Details!' });
        }

        if (startTime && endTime && startTime > endTime) {
            return res.status(400).json({ message: 'Start Time cannot be greater than End Time' });
        }
        if (!startTime && !endTime) {
            return res.status(400).json({ message: 'StartTime & EndTime is required' });
        }

        const task = {
            title,
            description,
            email,
            startTime: startTime ? new Date(startTime) : null,
            endTime: endTime ? new Date(endTime) : null
        }

        console.log("Creating task:", task);

        const newTask = new Task(task);

        await newTask.save();
        console.log("Task saved successfully");

        res.status(201).json({
            success: true,
            message: "Task Created Successfully",
            newTask
        });

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(409).json({ message: error.message });
    }
}
