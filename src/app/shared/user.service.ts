import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{User ,Loginuser} from './user.model';
import{Product} from './product.model'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public regnew:User={
    _id:this.getuserid(),
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    confirmpassword:'',

  };

  public existinguser:Loginuser={
    email:'',
    password:''
  };

  public newproduct:Product={
    productname:'',
    productprice:'',
    productquantity:'',
    user:this.getuserid()


  };




  constructor( private http:HttpClient) { }

  //insert data of registerpage
register(user:User){
  return this.http.post('http://localhost:3200/newreg',user)

}

//generate token if user is existing in database
login(existuser:Loginuser){
  return this.http.post('http://localhost:3200/auth',existuser) //returns token and user
}

//to display selected user content
display(id:any){
  return this.http.get('http://localhost:3200/userinfo/'+id);   //returns success message and data

}
 //add new products
addproduct(product:Product){
  return this.http.post('http://localhost:3200/addproduct',product);

}

//display products of user

displayproduct(id:any){
  return this.http.get('http://localhost:3200/displayproduct/'+id);
}

updateuser(selected:User){
  return this.http.put(`${'http://localhost:3200/updateRecord'}/${this.getuserid()}`,selected);
}
// selected._id
//fetch existing data of selected user
// selecteduser(id:any){
//   return this.http.get('http://localhost:3200/selectRecord/'+id);   //returns success message and data

// }



// use localstorage to store token
setToken(token:string){
  localStorage.setItem('usertoken',token);

}

getToken(){
  return localStorage.getItem('usertoken');
}

deleteToken(){
  localStorage.removeItem('usertoken');
}

//decode token
getPayload(){
  var token = JSON.stringify(this.getToken());
  var userpayload= atob(token.split('.')[1]);
  if(userpayload){
    return JSON.parse(userpayload);
  }

  else{
    return null;
  }
}

isloggedIn(){
  var userpayload=this.getPayload();
  if(userpayload){
    return userpayload.exp>Date.now()/1000;
  }
  else{
    return null;
  }
}


//localstorage to store user id
setuserid(id:string){
  localStorage.setItem('userid',id);
}

getuserid(){
  return localStorage.getItem('userid');
}

deleteuserid(){
  localStorage.removeItem('userid');
}





}
