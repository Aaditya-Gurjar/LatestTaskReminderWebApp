import cron from "node-cron";
import Task from "../models/task.model.js"
import { sendReminderEmail } from "./sendReminderEmail.js";

cron.schedule("* * * * *", async () => {
    const now = new Date();

    try {
        // Find tasks that will start in the next 10 minutes and haven't received a reminder yet
        const tasks = await Task.find({
            startTime: {
                $gte: new Date(now.getTime() + 10 * 60 * 1000), // 10 minutes after now
                $lt: new Date(now.getTime() + 11 * 60 * 1000)  // Between 10 and 11 minutes from now
            },
            // status: "pending",
            reminderSent: false
        });

        tasks.forEach(async (task) => {

            await sendReminderEmail(task.email, task);
            task.reminderSent = true;
            await task.save();
        });
    } catch (error) {
        console.error("Error scheduling reminders:", error);
    }
});
