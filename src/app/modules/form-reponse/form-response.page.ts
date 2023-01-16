import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnbounceParams, Result } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form-response',
  templateUrl: './form-response.page.html',
  styleUrls: ['./form-response.page.scss'],
})
export class FormResponsePage implements OnInit {
  loading: boolean;
  params: UnbounceParams;
  result: Result;
  date: string;
  private token: string;

  constructor(
    private route: ActivatedRoute,
    private common: CommonService,
    private api: ApiService
  ) {
    this.loading = true;
    this.date = new Date().getFullYear().toString();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.params = {...params} as UnbounceParams;
      this.setRequestParamsToUrlQueryParams();
      this.token = params['token'];
      const isDevelopment = this.common.isDevelopment();
      isDevelopment ? this.simulateSendRequest() : this.sendRequest();
    });
  }

  private setRequestParamsToUrlQueryParams(): void {
    const pathRequestOkParams = 'RequestOKParams';
    const pathRequestKoParams = 'RequestKOParams';
    let hasParamsRequest = Object.entries(this.params).filter( key => key[0].includes(pathRequestOkParams) || key[0].includes(pathRequestKoParams) );
    
    let queryParamsRequest: any = hasParamsRequest[0] ? hasParamsRequest.filter( (param) => param[0] = param[0].includes(pathRequestOkParams) ?
      param[0].replace(pathRequestOkParams, '') : param[0].replace(pathRequestKoParams, '')) : 0;

    if (queryParamsRequest) {
      let queryParamsConcat = '';
      let t;
      let removeQueryParamsDuplicity = queryParamsRequest.filter(( t={}, a=> !(t[a]=a in t) ));
      removeQueryParamsDuplicity.forEach( (param, i) => {
        queryParamsConcat += i === 0 ? '?' + `${param[0]}=${param[1]}` : '&' + `${param[0]}=${param[1]}`;
      });
      this.params.btnOkUrl = this.params.btnOkUrl + queryParamsConcat;
    }
  }

  private simulateSendRequest() {
    setTimeout(() => {
      this.loading = false;
      this.result = 'error';
      this.common.stepView(this.result, this.params, this.params.pageName)
    }, 4000);
  }

  private sendRequest() {
    this.api.sendFormData({ token: this.token }).subscribe(
      (res) => {
        this.loading = false;
        this.result = (res.data.resultado === 'OK')
          ? 'success'
          : 'error';

        this.common.stepView(this.result, this.params, this.params.pageName)
      },
      (err) => {
        this.loading = false;
        this.result = 'error';
        this.common.stepView(this.result, this.params, this.params.pageName, err)
      }
    );
  }
}
