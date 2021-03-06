/**
 * Created by gregoire on 25/03/2016.
 */
import {Component, Input} from 'angular2/core';
import {NavController, IONIC_DIRECTIVES, Button, Icon} from 'ionic-angular';
import {Page2} from '../page2/page2';

@Component({
    selector: 'nav-button',
    template: `
<ion-toolbar>
    <ion-title>{{address}}</ion-title>
    <ion-buttons start>
        <button royal (click)="goToPage2()">
            <ion-icon name="search"></ion-icon>
        </button>
    </ion-buttons>
</ion-toolbar>
    `,
    directives: [IONIC_DIRECTIVES]
})
export class NavButton {
    @Input() address
    constructor(nav:NavController) {
        this.nav = nav;
    }

    goToPage2() {
        this.nav.push(Page2);
    }
}