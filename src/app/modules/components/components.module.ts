import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorRequestComponent } from './error-request/error-request.component';
import { SuccessRequestComponent } from './success-request/success-request.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ErrorRequestComponent, SuccessRequestComponent],
  exports: [ErrorRequestComponent, SuccessRequestComponent],
})
export class ComponentsModule {}
