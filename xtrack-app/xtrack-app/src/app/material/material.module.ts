import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'; 
const materialComponents = [

    MatInputModule,
    MatSnackBarModule,
    MatTableModule
 
 ];
 
 @NgModule({
 
     imports: [materialComponents],
     exports: [materialComponents]
   })
 
 export class MaterialModule { }
 