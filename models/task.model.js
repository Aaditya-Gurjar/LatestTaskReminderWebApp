import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    email: {
        type: String,
        required: true,
    },
    status: {
        type : String,
        enum : ['active', 'completed', 'pending'],
        default : 'pending'
    },
    startTime : {
        type : Date,
        default : null
    },
    endDate : {
        type : Date,
        default : null
    },
     reminderSent: { 
        type: Boolean,
        default: false
    }
    
});

const Task = mongoose.model('Task', taskSchema);

export default Task;

