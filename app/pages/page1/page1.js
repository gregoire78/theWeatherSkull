import {Page} from 'ionic-angular';
import {NavButton} from './navButton';
import {Date} from './Date';
import {Geolocation} from 'ionic-native';

@Page({
    templateUrl: 'build/pages/page1/page1.html',
    directives: [NavButton, Date]
})
export class Page1 {
    constructor() {
        Geolocation.getCurrentPosition().then((resp) => {
            this.pos = resp.coords.latitude;
            this.pos1 = resp.coords.longitude
        });
    }
}
