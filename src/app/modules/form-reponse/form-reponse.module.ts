import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FormResponsePage } from './form-response.page';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [FormResponsePage],
  imports: [
    RouterModule.forChild([{ path: '', component: FormResponsePage }]),
    CommonModule,
    ComponentsModule,
    MaterialModule
  ],
})
export class FormReponseModule {}
