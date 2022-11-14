import { Environments } from './models/interfaces';
import { CommonService } from './services/common.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnbounceParams } from 'src/app/models/interfaces';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  stylePath: SafeResourceUrl;
  favIcon: HTMLLinkElement;
  browserTitle: HTMLTitleElement;

  constructor(private route: ActivatedRoute, private common: CommonService) {
    this.favIcon = document.querySelector('#appIcon');
    this.browserTitle = document.querySelector('#browserTitle');
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: UnbounceParams) => {
      if (params.favicon) {
        this.favIcon.href = this.common.getTrustUrl(params.favicon) as string;
      }
      if (params.browserTab) {
        this.browserTitle.innerHTML = params.browserTab;
      }
      if (this.common.thereIsExternalStyles(params)) {
        const env = this.common.env;
        const stylePath = params.style;
        this.stylePath = this.common.getTrustUrl(
          env === Environments.DEV
            ? stylePath
            : `${this.common.getStyleBaseUrl(env)}${stylePath}`
        );
      }
    });
  }
}
