require('./usermodel');
const mongoose=require('mongoose');
var productSchema=mongoose.Schema({
  productname:{
    type:String
  },
  productprice:{
    type:String
  },
  productquantity:{
    type:Number
  },
  date:{
    type:Date,
    default:Date.now()
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'register'
  }
})

mongoose.model('product',productSchema);
