import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

const MaterialComponents= [
  MatDialogModule,
  MatCheckboxModule,
  MatRadioModule
]
@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
