import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ZomatoService {
  apiKey = "api-key-here";
  baseUrl = "https://developers.zomato.com/api/v2.1";

  constructor(
    private loadingCtrl: LoadingController,
    private httpClient: HttpClient
  ) {}

  getParams(params) {
    let userKey = {
      headers: {
        Accept: "application/json",
        "user-key": this.apiKey
      }
    };

    return { ...userKey, ...params };
  }

  search(params) {
    return this.httpClient.get(
      this.baseUrl + "/search",
      this.getParams(params)
    );
  }

  async showLoader(text?: string) {
    const loader = await this.loadingCtrl.create({
      spinner: "bubbles",
      message: text || "Please Wait..."
    });

    return await loader.present();
  }

  async hideLoader() {
    return await this.loadingCtrl.dismiss();
  }
}
