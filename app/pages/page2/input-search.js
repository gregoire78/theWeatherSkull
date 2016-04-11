/**
 * Created by gregoire on 11/04/16.
 */
import {Component, Input} from 'angular2/core';
import {NavController, IONIC_DIRECTIVES, Button, Icon} from 'ionic-angular';
import {Page3} from '../page3/page3';

@Component({
    selector: 'input-search',
    template: `
<ion-toolbar>
    <ion-title>
        <input type="search" id="pac-input" onclick="this.value = ''" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="Rechercher..." spellcheck="false" type="search">
    </ion-title>
    <ion-buttons end>
        <button royal (click)="goToDetails()">
            <ion-icon name="arrow-dropright-circle"></ion-icon>
        </button>
    </ion-buttons>
</ion-toolbar>
`,
    directives: [IONIC_DIRECTIVES, Button, Icon, Page3]
})
export class InputSearch {
    constructor(nav:NavController){
        this.nav = nav;
    }
    goToDetails() {
        this.nav.push(Page3);
    }
}