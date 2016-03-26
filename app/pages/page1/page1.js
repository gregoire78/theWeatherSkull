import {Page} from 'ionic-angular';
import {NavButton} from './navButton';
import {CurrentTime} from './currentTime';
import {Geolocation} from 'ionic-native';

@Page({
    templateUrl: 'build/pages/page1/page1.html',
    directives: [NavButton, CurrentTime ]
})
export class Page1 {
    posi: int;
    posp: int;
    constructor() {
        Geolocation.getCurrentPosition().then((resp) => {
            this.posi = resp.coords.latitude;
            this.posp = resp.coords.longitude
        });
    }
}
