const Task = require('../models/Task');
const User = require('../models/User');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get tasks' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

exports.smartAssignTask = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) return res.status(404).json({ message: "No user found for smart assign" });

    const userTaskCounts = await Promise.all(users.map(async (user) => {
      const count = await Task.countDocuments({ assignedTo: user._id, status: { $ne: "Done" } });
      return { user, count };
    }));

    const leastBusyUser = userTaskCounts.reduce((min, current) =>
      current.count < min.count ? current : min
    );

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedTo: leastBusyUser.user._id },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Smart assign failed' });
  }
};
