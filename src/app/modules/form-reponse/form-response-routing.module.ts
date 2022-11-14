import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormResponsePage } from './form-response.page';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: FormResponsePage }]),
    CommonModule,
  ],
  declarations: [],
})
export class FormResponseRoutingModule {}
