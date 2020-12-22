import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const materialComponents = [

    MatInputModule,
    MatSnackBarModule
 
 ];
 
 @NgModule({
 
     imports: [materialComponents],
     exports: [materialComponents]
   })
 
 export class MaterialModule { }
 