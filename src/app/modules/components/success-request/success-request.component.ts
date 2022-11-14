import { CommonService } from './../../../services/common.service';
import { Component, Input, OnInit } from '@angular/core';
import { UnbounceParams } from 'src/app/models/interfaces';

@Component({
  selector: 'app-success-request',
  templateUrl: './success-request.component.html',
  styleUrls: ['./success-request.component.scss'],
})
export class SuccessRequestComponent {
  @Input() params: Partial<UnbounceParams> = {};
  @Input() date: string;

  constructor(public common: CommonService) {}
}
