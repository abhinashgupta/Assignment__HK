var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    taskname : String,
    type : String,
    user : {
       type:  mongoose.Schema.Types.ObjectId,
       ref : 'user'
    }
})

var task = mongoose.model('task', taskSchema);
module.exports = task;