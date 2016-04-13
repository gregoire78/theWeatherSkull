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
        <input type="search" id="pac-input" onclick="this.value = ''" #searchInput autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="Rechercher..." spellcheck="false" type="search">
    </ion-title>
    <ion-buttons end>
        <button royal (click)="goToDetails(searchInput)">
            <ion-icon name="arrow-dropright-circle"></ion-icon>
        </button>
    </ion-buttons>
</ion-toolbar>
`,
    directives: [IONIC_DIRECTIVES, Button, Icon, Page3]
})
export class InputSearch {
    @Input() weather;
    @Input() place;
    constructor(nav:NavController){
        this.nav = nav;
    }

    goToDetails(searchInput) {
        if (!searchInput.value=='' || this.place.geometry){
            this.nav.push(Page3,{
                weather: this.weather,
                place: this.place
            })
        }
    }
}