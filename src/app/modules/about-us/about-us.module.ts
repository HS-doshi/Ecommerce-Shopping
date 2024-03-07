import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUs2Component } from './about-us-2/about-us-2.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    AboutUs2Component
  ],
  exports:[],
  providers:[],
})
export class AboutUsModule { }
