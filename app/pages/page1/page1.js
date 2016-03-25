import {Page} from 'ionic-angular';
import {NavButton} from './navButton';

@Page({
    templateUrl: 'build/pages/page1/page1.html',
    directives: [NavButton]
})
export class Page1 {
    constructor() {
        navigator.geolocation.getCurrentPosition(function (position) {
            alert(
                'Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n' +
                'Altitude: ' + position.coords.altitude + '\n' +
                'Accuracy: ' + position.coords.accuracy + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                'Heading: ' + position.coords.heading + '\n' +
                'Speed: ' + position.coords.speed + '\n' +
                'Timestamp: ' + position.timestamp + '\n')
        });
    }
}
