const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, // sets the data type as a MongoDB object ID
        ref: 'user' // tells Mongoose to reference the user collection - a way to link notes to users
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    }
});

const Notes = mongoose.model("notes", NotesSchema);
module.exports = Notes;