import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userserviceobj:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  userdata:any=[];

  logindata(f:NgForm){
    this.userserviceobj.login(f.value).subscribe((res)=>{    //login page gives response of token and user
     this.userdata=res;
      console.log(this.userdata.token);  //returns token


     this.userserviceobj.setToken(this.userdata.token);
     this.userserviceobj.setuserid(this.userdata.user._id);

     this.router.navigateByUrl('/profile');

      console.log(res);
    },(err)=>{
      console.log(err);


    }

    )
  }



}
