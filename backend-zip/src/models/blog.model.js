const mongoose = require("mongoose")

const blogMSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    summary:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    images:{
        type:[String],
         validate: [arr => arr.length <= 4, 'Maximum 4 images allowed'],
    },
      createdAt: {
    type: Date,
    default: Date.now(),
  },
},

)

const Blog = mongoose.model("blogs", blogMSchema)

module.exports =Blog