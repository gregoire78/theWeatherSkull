/**
 * Created by gregoire on 25/03/2016.
 */
import {Component} from 'angular2/core';

@Component({
    selector: 'current-time',
    template: `
        <h1>{{strDay(day)}} {{dat}} {{strMonth(month)}} {{year}}</h1>
        <h2>{{hour}}h {{minute}}m {{seconde}}s</h2>
    `
})
export class CurrentTime {
    time:Date;
    frDate = {
        weekday : [
            "Dimanche",
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi"
        ],
        monthname : [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Aout",
            "Septembre",
            "Octobre",
            "Décembre"
        ]
    };

    constructor() {
        this.time = new Date();
        setInterval(() => {
            this.time = new Date();
            this.day = this.time.getDay();
            this.dat = this.time.getDate();
            this.month = this.time.getMonth();
            this.year = this.time.getFullYear();
            this.hour = this.time.getHours();
            this.minute = this.time.getMinutes();
            this.seconde = this.time.getSeconds();
        }, 1000);
    }

    strDay(day:int) {
        return this.frDate.weekday[day];
    }

    strMonth(month:int) {
        return this.frDate.monthname[month];
    }
}
