var taskModel = require("../models/taskModel");
var userModel = require("../models/userModel");
const EXCELJS = require("exceljs");
const xlsx = require("xlsx");
const json2xls = require("json2xls");
const fs = require("fs");

module.exports = {
  /**
   * @access public
   * @desc used for adding the new task to user
   * @route /addTask
   */
  addTask: async (req, res, next) => {
    try {
      const { user, taskname, type } = req.body;
      await taskModel.create({ taskname, type, user });
      res.redirect("/allUsers");
    } catch (err) {
      next(err);
    }
  },

  /**
   * @access public
   * @desc used for fetching the task of the user by their id
   * @route /showTask/:id
   */
  showTaskById: async (req, res, next) => {
    try {
      const task = await taskModel.find({ user: req.params.id });
      console.log(task);
      res.render("showTask", { task });
    } catch (err) {
      next(err);
    }
  },

  /**
   * @access public
   * @desc used for showing all the user tasks
   * @route /addTask
   */
  getAllTask: async (req, res, next) => {
    try {
      const users = await userModel.find({});
      res.render("addTask", { users });
    } catch (err) {
      next(err);
    }
  },

  /**
   * @access public
   * @desc used for downloading the excel sheet of the user with their particular tasks
   * @route /excelSheetCreated
   */
  downloadExcelSheet: async (req, res, next) => {
    try {
      var users = await userModel.find();
      var tasks = await taskModel.find().populate("user");
      var data = users.map((e) => ({
        id: e._id.toString(),
        name: e.name,
        email: e.email,
        mobile: e.mobile,
      }));
      var taskdata = tasks.map((e) => ({
        user: e.user.name,
        taskname: e.taskname,
        type: e.type,
      }));
      console.log(data);

      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(data);
      const worksheet2 = xlsx.utils.json_to_sheet(taskdata);
      xlsx.utils.book_append_sheet(workbook, worksheet, "UserData");
      xlsx.utils.book_append_sheet(workbook, worksheet2, "TaskData");
      xlsx.writeFile(workbook, "usersData.xlsx");
      // res.send("Excel Data Created Successfully");
      res.download("usersData.xlsx");
    } catch (err) {
      next(err);
    }
  },
};
