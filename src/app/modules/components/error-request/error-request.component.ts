import { CommonService } from './../../../services/common.service';
import { Component, Input, OnInit } from '@angular/core';
import { UnbounceParams } from 'src/app/models/interfaces';

@Component({
  selector: 'app-error-request',
  templateUrl: './error-request.component.html',
  styleUrls: ['./error-request.component.scss'],
})
export class ErrorRequestComponent {
  @Input() params: UnbounceParams;
  @Input() date: string;

  constructor(public common: CommonService) {}
}
