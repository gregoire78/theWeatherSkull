import {Component} from 'angular2/core'
import {NavController} from 'ionic-angular'
import {Page2} from '../page2/page2'
import {button, Icon} from 'ionic-angular'

@Component({
    selector:'nav-button',
    template:`
    <button (click)="goToPage2()">Go to Page2</button>
    
     `
})

export class NavButton {
    constructor(nav: NavController) {
        this.nav = nav
    }

    goToPage2(){
        nav.push(Page2)
    }
}