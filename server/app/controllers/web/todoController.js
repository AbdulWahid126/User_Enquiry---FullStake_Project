const todoModel = require("../../models/todo.model");

let createTodo = async (req, res) => {
    try {
        let { title, description } = req.body;
        if (!title) {
            return res.send({ status: 0, message: "Task title is required" });
        }

        let todo = new todoModel({
            title,
            description,
            user: req.user.id
        });

        await todo.save();
        res.send({ status: 1, message: "Task added successfully", todo });
    } catch (err) {
        res.send({ status: 0, message: "Error while adding task", error: err.message });
    }
};

let getTodos = async (req, res) => {
    try {
        let todos = await todoModel.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.send({ status: 1, todoList: todos });
    } catch (err) {
        res.send({ status: 0, message: "Error fetching tasks", error: err.message });
    }
};

let updateTodo = async (req, res) => {
    try {
        let todoId = req.params.id;
        let { title, description, completed } = req.body;

        // Perform update only if the todo belongs to the active user
        let todo = await todoModel.findOneAndUpdate(
            { _id: todoId, user: req.user.id },
            { title, description, completed },
            { new: true }
        );

        if (!todo) {
            return res.send({ status: 0, message: "Task not found or unauthorized" });
        }
        res.send({ status: 1, message: "Task updated successfully", todo });
    } catch (err) {
        res.send({ status: 0, message: "Error while updating task", error: err.message });
    }
};

let deleteTodo = async (req, res) => {
    try {
        let todoId = req.params.id;

        // Delete only if it belongs to the active user
        let todo = await todoModel.deleteOne({ _id: todoId, user: req.user.id });

        if (todo.deletedCount === 0) {
            return res.send({ status: 0, message: "Task not found or unauthorized" });
        }
        res.send({ status: 1, message: "Task deleted successfully" });
    } catch (err) {
        res.send({ status: 0, message: "Error while deleting task", error: err.message });
    }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
