import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';

const materialComponents = [

    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule
 ];
 
 @NgModule({
 
     imports: [materialComponents],
     exports: [materialComponents]
   })
 
 export class MaterialModule { }
 