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

  selected!:User;
  id:any;
  userdata:any=[];
  userinfo:any=[];
  edituser:any=[];
  edit:any=[];
  updateform!:NgForm;
   @ViewChild('updateform',{static:false})
   newForm!:NgForm


  ngOnInit(): void {

    // this.activatedrouteobj.queryParams.subscribe(params=>{
    //   this.id=params['id']
    // });
    // setTimeout(()=>{

    //   this.newForm.form.patchValue({
    //     firstname:this.edit.firstname,
    //     lastname:this.edit.lastname,
    //     email:this.edit.email,

    //   })
    //   },)


    this.id=this.userserviceobj.getuserid();
    console.log(this.id);
    this.userdata=this.userserviceobj.display(this.id).subscribe((res)=>{
      // with display method returns success,msg,data

      console.log(res);
      this.userdata=res;
      this.userinfo=this.userdata.data;
      console.log(this.userinfo);



     })

    }


  OnSubmit(f:NgForm){
    // console.log(f.value);
    this.userserviceobj.updateuser(f.value).subscribe((res)=>{
      console.log(res);
      this.edituser=res;
      this.edit=this.edituser.data;
      console.log(this.edit);


    })


}


}
