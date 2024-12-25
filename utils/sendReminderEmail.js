import nodemailer from "nodemailer";

export const sendReminderEmail = async (email, task) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail", 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Task Reminder: " + task.title,
        text: `Hello, 

You have a task "${task.title}" scheduled to start at ${task.startTime}.

Task Details:
${task.description}

Best Regards,
Task Reminder System`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Reminder email sent to:", email);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
