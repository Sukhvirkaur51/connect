const mongoose=require('mongoose');
const multer=require('multer');

require('../config/passportconfig')
require('../model/usermodel');
require('../model/productmodel')
require('../model/productimage');

var regData=mongoose.model('register');
var productdata=mongoose.model('product');
var productimages=mongoose.model('productimage')

const passport = require('passport');
const jwt=require('jsonwebtoken');

module.exports.addnew=(req,res)=>{
    var reg=new regData({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        _id:req.body._id
    });
    reg.save().then((docs)=>{
        return res.status(200).json({
            message:"new user register successfully",
            success:true,
            data:docs

        })
    }).catch((err)=>{
        return res.status(401).json({
            message:"error in adding",
            success:false,
            error:err.message
        })
    })
}


// authentication....  generate token if user is verified
module.exports.authenticate=(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
      if(err) return res.status(404).json(err);
      if (user) return res.status(200).json({
          "token":jwt.sign({_id:user._id},"SecretToken",{expiresIn:'60m'}),
          "user":user
      });
      if(info) return res.status(401).json(info)
  })(req,res,next)
}


//selected user
module.exports.selecteduser=(req,res)=>{
  regData.findById({_id:req.params.id}).then
  ((docs)=>{
    return res.status(200).json({
      success:true,
      message:'user found',
      data:docs
    })
  }).catch((err)=>{
    return res.status(400).json({
      success:false,
      message:'User not found',
      error:err.message
    })
  })
}

//add product data
module.exports.addnewproduct=(req,res)=>{
  var myproduct=new productdata({
    productname:req.body.productname,
    productprice:req.body.productprice,
    productquantity:req.body.productquantity,
    user:req.body.user
  });
  myproduct.save().then((docs)=>{
 return res.status(200).json({
  success:true,
  message:'new product added',
  data:docs

 })
  }).catch((err)=>{
    return res.status(400).json({
      success:false,
      message:'error in adding',
      error:err.message
  })
})
}

//display product

module.exports.displayproduct=(req,res)=>{
  return productdata.find({user:req.params.userid}).populate('user').exec().then((docs)=>{
    return res.status(200).json({
      success:true,
      message:'list of products',
      data:docs
  })
}).catch((err)=>{
  return res.status(400).json({
    success:false,
    message:'error in displaying',
    error:err.message
})
})
}

module.exports.displayfile=(req,res)=>{
  res.sendFile(__dirname+"/file.html");
}

//for uploading image

var storage=multer.diskStorage({

diskStorage:(req,file,cb)=>{
  cb(null,'./uploads');
},
filename:(req,file,cb)=>{
  cb(null,file.originalname);
}

})
// require('../uploads')


var upload=multer({storage:storage}).single('photo');

module.exports.uploadimage=(req,res)=>{
  upload(req,res,(err)=>{
    if(err)
    console.log("error in uploading file" +err);

    else{
      console.log("file uploading successfully");

      var prodimg=new productimages({
        product:req.params.productid,
        imagepath:req.file.path
      });

      prodimg.save().then((docs)=>{
        return res.status(200).json({
          success:true,
          message:"uploaded successfully",
          data:docs
        })
      })
           .catch((err)=>{
           return res.status(404).json({
             success:false,
             message:"error in uploading file",
             error:err.message
           })
           })

           console.log(req.file);

    }
  })
}


//fetch data only for selectedid
// module.exports.selectedData=(req,res)=>{
//   const uid=req.params.userid;

//   regData.findById({_id:uid}).then((docs)=>{
//       return res.status(200).json({
//           success:true,
//           message:"Record found",
//           data:docs
//       })
//   }).catch((err)=>{
//       return res.status(401).json({
//           success:false,
//           message:"no record found",
//           error:err.message
//       })
//   })
// }

//update data by id
module.exports.updatedData=(req,res)=>{

  var updatedData=req.body;

  regData.findByIdAndUpdate({_id:req.params.id},{$set:updatedData},{new:true})
  .then((docs)=>{
      return res.status(200).json({
          success:true,
          message:'Data updated',
          data:docs
      })  })
      .catch((err)=>{
          return res.status(401).json({
              success:false,
              message:"error in updating data",
              error:err.message
          })
      })

}

