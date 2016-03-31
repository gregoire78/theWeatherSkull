import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Page1} from './pages/page1/page1';
import {HTTP_PROVIDERS} from 'angular2/http';
import * as rx from 'rxjs';


@App({
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'build/app.html',
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
    static get parameters() {
        return [[Platform]];
    }

    constructor(platform) {
        this.rootPage = Page1;

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }
}

