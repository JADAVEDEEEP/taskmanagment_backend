const taskdb=require('../model/taskdb');

//this gettask function will fetch the all task by user id and send the json responce as task data to the client
//in simple word whoever the user is loged in it will able to fetch ony theeir task  
const gettask=async(req,res)=>{
    try {
        //in short login user can only see their tasks not other users tasks    
        //it will fetch the tasks based on user id were only loged in user can ftch their own tasks not other users tasks
        //using find method it will fetch the tasks by userid from the task db and return the tasks to the user
        const tasks = await taskdb.find({ userId: req.userId }).sort({ createdAt: -1 });    
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}
//it will fetch the task by userid and send the json responce as task data to the client
const gettaskbyid = async (req, res) => {
    try {

        // Check user exists in request
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            });
        }
         //using find method it will fetch the task by task id and user id from the task db and return the task to the user
        const task = await taskdb.findOne({ _id: req.params.id, userId: req.userId });

        // No tasks found
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            task
        });

    } catch (error) {
        console.error("Get Tasks Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks"
        });
    }
};
//this createtask function will create the task and save the task data in the taskdb and send the json responce as created task data to the client
const createtask = async (req, res) => {
    try {

        const { title, description, status } = req.body;

        // Validation cneck for required fields
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and Description are required"
            });
        }
      //using create method it will create the task and save the task data in the taskdb and send the json responce as created task data to the client
        const task = await taskdb.create({
            title,
            description,
            status: status || "pending",
            userId: req.userId
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create task"
        });
    }
};

const updatetask = async (req, res) => {
try {
//it will fetch the task by task id from the taskdb and check the task is exist or not if not exist it will send the json responce as task not found to the client
 const task = await taskdb.findOne({ _id: req.params.id, userId: req.userId });

if (!task) {
    return res.status(404).json({ message: "Task not found" });
}

const updateFields = {};

if (req.body.title !== undefined) {
    updateFields.title = req.body.title;
}

if (req.body.description !== undefined) {
    updateFields.description = req.body.description;
}

if (req.body.status !== undefined) {
    updateFields.status = req.body.status;
}

if (!Object.keys(updateFields).length) {
    return res.status(400).json({ success: false, message: "No task fields provided" });
}

//using find by id and update method it will update the task data by id from the taskdb and send the json responce as updated task data to the client
const updatedTask = await taskdb.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, updateFields, { new: true, runValidators: true });
res.status(200).json({ success: true, task: updatedTask });
} catch (error) {
    res.status(500).json({ success: false, message: "Failed to update task" });
}
}

const deletetask = async (req, res) => {
try {
 //it will fetch the task by task id from the taskdb and check the task is exist or not if not exist it will send the json responce as task not found to the client   
const task = await taskdb.findOne({ _id: req.params.id, userId: req.userId });

if (!task) {
    return res.status(404).json({ message: "Task not found" });
}

//using find by id and delete method it will delete the task data by id from the taskdb and send the json responce as task deleted successfully to the client
await taskdb.findByIdAndDelete(req.params.id);

res.status(200).json({
    success: true,
    message: "Task deleted successfully"
});
} catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete task" });
}
}

module.exports={gettask,createtask,updatetask,deletetask,gettaskbyid};
