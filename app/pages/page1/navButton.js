/**
 * Created by gregoire on 25/03/2016.
 */
import {Component} from 'angular2/core';
import {NavController} from 'ionic-angular';
import {Page2} from '../page2/page2';
import {Page3} from '../page3/page3';

@Component({
    selector: 'nav-button',
    template: `
        <button (click)="goToPage2()">Recherche</button>
        <button (click)="goToPage3()">Meteo sur 5 jours</button>

    `
})
export class NavButton{
    constructor(nav: NavController){
        this.nav = nav;
    }

    goToPage2(){
        this.nav.push(Page2);
    }

    goToPage3(){
        this.nav.push(Page3);
}
}

