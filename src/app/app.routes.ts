import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path : '' , redirectTo:'home-data' , pathMatch:'full'},
  { path : 'home-data' , component:HomeComponent},
  {
    path:'about-us' ,
    loadChildren:()=>
      import('./modules/about-us/about-us.module').then(
        (m)=>m.AboutUsModule
      )
  },
];
