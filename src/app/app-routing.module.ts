import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:RegisterComponent
  },

  {
    path:'login',
    component:LoginComponent,


  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthGuard]


  },
  {
    path:'product',
    component:ProductComponent
  },

  {
    path:'editprofile',
    component:EditprofileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
