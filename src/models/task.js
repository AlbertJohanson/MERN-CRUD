const mongoose = require('mongoose');


const {Schema} = mongoose;

const TaskSchema = new Schema({
    title: {type: String, require:true},
    description:{type: String, require:true}

})

const model = mongoose.model('Task', TaskSchema);

module.exports = model;