import {Page, NavParams} from 'ionic-angular';

@Page({
  template:`
<ion-navbar *navbar primary="">
    <ion-title>The Weather Skull</ion-title>
</ion-navbar>

<ion-content class="page3">
    <div>{{weather.weather[0].description}}</div>
    <div>{{place.address}}</div>
</ion-content>`,
  directives: []
})
export class Page3 {
  constructor(navParams: NavParams){
    this.weather = navParams.get("weather");
    this.place = navParams.get("place");
    this.place.address = [
      (this.place.address_components[0] && this.place.address_components[0].short_name || ''),
      (this.place.address_components[1] && this.place.address_components[1].short_name || ''),
      (this.place.address_components[2] && this.place.address_components[2].short_name || '')
    ].join(' ');
  }
}
