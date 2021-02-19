import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon'; 


const materialComponents = [

    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatIconModule
 ];
 
 @NgModule({
 
     imports: [materialComponents],
     exports: [materialComponents]
   })
 
 export class MaterialModule { }
 