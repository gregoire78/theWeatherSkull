/**
 * Created by gregoire on 25/03/2016.
 */
import {Component} from 'angular2/core';
import {NavController} from 'ionic-angular';
import {Page2} from '../page2/page2';
import {Button, Icon} from 'ionic-angular';

@Component({
    selector: 'nav-button',
    template: `
        <button (click)="goToPage2()" outline block>
            <ion-icon name="search"></ion-icon>
                Recherche
        </button>
    `,
    directives: [Button, Icon]
})
export class NavButton {
    constructor(nav:NavController) {
        this.nav = nav;
    }

    goToPage2() {
        this.nav.push(Page2);
    }
}