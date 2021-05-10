require('./usermodel');

const mongoose=require('mongoose');

var productimageSchema=mongoose.Schema({

  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'product'
  },

  imagepath:{
    type:String
  },

  date:{
    type:Date,
    default:Date.now()
  }
})

mongoose.model('productimage' ,productimageSchema);
