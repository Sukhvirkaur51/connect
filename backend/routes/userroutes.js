var express =require('express');
var myctrl=require('../controller/usercontroller');

var approute=express.Router();

approute.post('/newreg',myctrl.addnew);
approute.post('/auth',myctrl.authenticate);  //gives response "token" and "user"
approute.get('/userinfo/:id',myctrl.selecteduser);  //  fetch selected user data ...gives response "success","message","data"
approute.post('/addproduct',myctrl.addnewproduct);
approute.get('/displayproduct/:userid',myctrl.displayproduct);

approute.put('/updateRecord/:id',myctrl.updatedData);  //for update
// approute.get('/selectRecord/:userid',myctrl.selectedData);

approute.get('/',myctrl.displayfile);
approute.post('/imageupload/:productid',myctrl.uploadimage);


module.exports=approute
