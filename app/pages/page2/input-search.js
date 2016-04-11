/**
 * Created by gregoire on 11/04/16.
 */
import {Component, Input} from 'angular2/core';
import {NavController, IONIC_DIRECTIVES, Button, Icon} from 'ionic-angular';
import {Page2} from './page2';

@Component({
    selector: 'input-search',
    template: `
<ion-toolbar>
<ion-title>

        <input type="search" id="pac-input" onclick="this.value = ''" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="Rechercher" spellcheck="false" type="search">
</ion-title>
        <ion-buttons end>
        <button royal>
            <ion-icon name="refresh"></ion-icon>
        </button>
    </ion-buttons>
    </ion-toolbar>
    `,
    directives: [IONIC_DIRECTIVES, Button, Icon]
})
export class InputSearch {

}