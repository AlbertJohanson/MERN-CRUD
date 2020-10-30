const express = require("express");

//Router
const router = express.Router();
//Task Model
const Task = require("../models/task");

//Get all task

router.get("/", async (req, res) => {
  const task = await Task.find();
  res.json(task);
});

//Filter of task

router.get('/:id', async(req,res)=>{
    const task = await Task.findById(req.params.id);
    res.json(task);
});

//Add a new task
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.json({ status: "OK", message: "The Task has been saved" });
});

//Update Task
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const newTask = { title, description };
  await Task.find(req.params.id, newTask);
  res.json({ status: "OK", message: "The task has been updated" });
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: "OK", message: "The task has been eliminated" });
});

module.exports = router;
