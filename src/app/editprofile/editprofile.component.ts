import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import{User} from '../shared/user.model'

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor(private activatedrouteobj:ActivatedRoute ,public userserviceobj:UserService ,private router:Router) { }

  id:any;
  userdata:any=[];
  userinfo:any=[];
  updateform!:NgForm;

  // public exist: User={
  //   firstname:'this.userinfo.firstname',
  //   lastname:'this.userinfo.lastname',
  //   email:'this.userinfo.email',
  //   password:'this.userinfo.password',
  //   confirmpassword:'this.userinfo.confirmpassword'
  // }




  ngOnInit(): void {
    this.id=this.userserviceobj.getuserid();
    console.log(this.id);
    this.userdata=this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data

      console.log(res);
      this.userdata=res;
      this.userinfo=this.userdata.data;
      console.log(this.userinfo);
      // this.exist=this.userinfo;
      // console.log(this.exist);


      // setTimeout(()=>{
      //   this.userserviceobj.display(this.id);
      //   this.updateform.form.patchValue({
      //     firstname:this.exist.firstname,
      //     lastname:this.exist.lastname,
      //     email:this.exist.email,
      //     password:this.exist.password,
      //     confirmpassword:this.exist.confirmpassword

      //   })
      // },)



    })
  }







  OnSubmit(f:NgForm){
    console.log(f.value);
    this.userserviceobj.updateuser(f.value).subscribe((res)=>{
      console.log(res);

    })

}


}
