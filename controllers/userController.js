var userModel = require("../models/userModel");
var taskModel = require("../models/taskModel");

module.exports = {
  /**
   * @access public
   * @desc used for rendering the home page
   * @route /
   */
  showHome: async (req, res, next) => {
    res.render("index");
  },

  /**
   * @access public
   * @desc used for fetching all the user data
   * @route /allUsers
   */
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userModel.find({});
      res.render("allUsers", { users });
    } catch (err) {
      next(err);
    }
  },

  /**
   * @access public
   * @desc used for showing the user data
   * @route /addUser
   */
  getAddUser: async (req, res, next) => {
    res.render("addUser");
  },

  /**
   * @access public
   * @desc used for adding the user data
   * @route /addUser
   */
  addUser: async (req, res, next) => {
    try {
      const { name, mobile, email } = req.body;
      await userModel.create({ name, email, mobile });
      res.redirect("/allUsers");
    } catch (err) {
      next(err);
    }
  },
};
