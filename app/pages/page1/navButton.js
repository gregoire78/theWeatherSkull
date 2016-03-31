/**
 * Created by gregoire on 25/03/2016.
 */
import {Component} from 'angular2/core';
import {NavController, IONIC_DIRECTIVES, Button, Icon} from 'ionic-angular';
import {Page2} from '../page2/page2';

@Component({
    selector: 'nav-button',
    template: `
        <button (click)="goToPage2()" light>
            <ion-icon name="search"></ion-icon>
        </button>
    `,
    directives: [IONIC_DIRECTIVES]
})
export class NavButton {
    constructor(nav:NavController) {
        this.nav = nav;
    }

    goToPage2() {
        this.nav.push(Page2);
    }
}