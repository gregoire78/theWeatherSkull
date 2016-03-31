import {Page} from 'ionic-angular';
import {Http} from 'angular2/http';

@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {
	constructor(http: Http) {
		this.http = http;
	}

	load(){
		  var autocomplete = new google.maps.places.Autocomplete((document.getElementById("dede")));
		  autocomplete.addListener('place_changed', () => {
		  	var lat = autocomplete.getPlace().geometry.location.lat();
		  	var lng = autocomplete.getPlace().geometry.location.lng();
		  	this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&units=metric&appid=f513805255c080947d4115bc85cf923e')
            .map(response => response.json())
            .subscribe(result => {
            	console.log(result)
            });
		  });
	}
}