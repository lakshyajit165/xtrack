import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';

const materialComponents = [

    MatInputModule
   
 
 ];
 
 @NgModule({
 
     imports: [materialComponents],
     exports: [materialComponents]
   })
 
 export class MaterialModule { }
 