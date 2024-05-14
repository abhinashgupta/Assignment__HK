var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController")
var taskController = require("../controllers/taskController");

//user routes
router.get("/", userController.showHome);
router.get("/allUsers", userController.getAllUsers);
router.get("/addUser", userController.getAddUser);
router.post("/addUser", userController.addUser);

//task routes
router.get("/addTask", taskController.getAllTask);
router.post("/addTask", taskController.addTask);
router.get("/showTask/:id", taskController.showTaskById);
router.get("/excelSheetCreated",taskController.downloadExcelSheet);

// Error handling middleware
router.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = router;
