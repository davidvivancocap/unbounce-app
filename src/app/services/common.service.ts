import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UnbounceParams } from 'src/app/models/interfaces';
import { Environments, EnvironmentsTypes } from './../models/interfaces';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private _env: EnvironmentsTypes;

  constructor(public sanitizer: DomSanitizer) {
    const href = window.location.href;

    if (href.includes('http://localhost:')) this.env = Environments.DEV;
    else if (href.includes('.desa.')) this.env = Environments.INT;
    else if (href.includes('.pre.')) this.env = Environments.PRE;
    else this.env = Environments.PRO;
  }

  isDevelopment(): boolean {
    return !environment.production;
  }

  thereIsExternalStyles(params: UnbounceParams): boolean {
    return params.style ? true : false;
  }

  getStyleBaseUrl(env: EnvironmentsTypes): string {
    return environment.production[env].syles.baseUrl;
  }

  getTrustUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  redirectTo(url: string, tokenSF?: string): void {
    if (tokenSF) url += `?tokenSF=${tokenSF}`;
    window.location.href = url;
  }

  stepView(step, params: UnbounceParams, pageName: string = `dev`, error?: HttpErrorResponse,) {
    this.updateDigitalData(params, error);

    if (typeof window['stepView'] === "function") {
      try {
        const id = pageName.split(' ').join('_') + `_${step}`;
        window['stepView'](id);
      } catch (e) {
        console.warn("*** Calling stepView function failed", e);
      }
    }
  }

  decode(str: string): string {
    return str
      .replace(/HTMLOPEN/g, '<')
      .replace(/HTMLCLOSE/g, '>');
  }



  set env(v: EnvironmentsTypes) {
    this._env = v;
  }

  get env(): EnvironmentsTypes {
    return this._env;
  }

  private updateDigitalData(params: UnbounceParams, error?: HttpErrorResponse) {
    const page = this.digitalDataBuilder(params, error);
    window['digitalData'].
      page = {
      ...window['digitalData'].page,
      ...page,
      product_page_title: params.pageName,
    };

  }

  private digitalDataBuilder(
    params: UnbounceParams,
    error?: HttpErrorResponse) {

    return {
      section2: error ? 'KO' : 'OK',
      url: params.formUrl,
      formulario_boi: params.pageName,
      formulario_boi_id: params.formId,
      channel: params.channel,
      login_status: params.loginStatus,
      error_type: error ? error.status : '',
      error_message: error ? error.message || 'unknown error' : ''
    };

  }

}
