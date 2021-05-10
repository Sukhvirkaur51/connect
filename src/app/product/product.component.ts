import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  productresponse:any;
  product:any=[];

  constructor(public userserviceobj:UserService) { }

  ngOnInit() {
  this.userserviceobj.displayproduct(this.userserviceobj.getuserid()).subscribe((res)=>{
    this.productresponse=res;
    this.product=this.productresponse.data;
  }
  ,(err)=>{
    console.log(err);


  }
  )

  }


  onadd(f:NgForm){
    this.userserviceobj.addproduct(f.value).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    }
    )

  }

}
