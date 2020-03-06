import { Component, OnInit } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { ZomatoService } from '../api/zomato.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public dinner;

  constructor(private zomatoService: ZomatoService, private geolocation: Geolocation) {}

  ngOnInit() {
    this.zomatoService.showLoader();
    this.geolocation.getCurrentPosition().then((res) => {
      this.zomatoService.hideLoader();
      console.log(res.coords.latitude, res.coords.longitude);
      this.getDinnerRestaurants(res.coords.latitude, res.coords.longitude);
    }).catch(err => console.log(err));
      
  }

  getDinnerRestaurants(lat, lon) {
    this.zomatoService.search({
      params: new HttpParams()
        .set('lat', lat)
        .set('lon', lon)
        .set('category', 'dinner')
    }).subscribe((response) => {
      this.dinner = response;
    })
  }
}
