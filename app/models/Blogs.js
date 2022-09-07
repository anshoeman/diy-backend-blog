const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    experimentName:{
        type:String
    },
    description:{
        type:String
    },
    difficulty:{
        type:Number,
        enum:[1,2,3,4,5]
    },
    subject:{
        type:String,
        enum:['Physics','Chemistry','Biology','General Science']
    },
    mainImage:{
        type:String,
    },
    materialList:[{
        Name:{
            type:String,
        },
        quantity:{
            type:Number
        }
    }],
    safetyPrecautions:{
        type:String
    },
    instructions:[{
        stepNumber:{
            type:Number
        },
        image:{
            type:String
        },
        stepDescription:{
            type:String
        }
    }],
})
module.exports = Blogs = mongoose.model("Blogs", BlogSchema);