const { Schema, model } = require("mongoose");
const flowSchema = new Schema({
    userId:{
        type:String,
        require:true
    },
    data:{
        type:Array,
        require:true
    },
    nodes:{
        type:Array,
        require:true
    },
    edges:{
        type:Array,
        require:true
    }
}, {timestamps:true})

const Flow = model('Flows', flowSchema);

module.exports = Flow;
