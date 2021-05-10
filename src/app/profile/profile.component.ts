import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userserviceobj:UserService, public router:Router) { }

  id:any;
  userdata:any=[];
  userinfo:any=[];

  ngOnInit(): void {
    this.id=this.userserviceobj.getuserid();
    console.log(this.id);
    this.userdata=this.userserviceobj.display(this.id).subscribe((res)=>{  //with display method returns success,msg,data
      this.userdata=res;
      this.userinfo=this.userdata.data;
      console.log(this.userinfo);
    })
  }

  productpage(){
    this.router.navigateByUrl('/product');
  }


edit(){
  this.router.navigateByUrl('/editprofile');

}

delete(){

}


}
