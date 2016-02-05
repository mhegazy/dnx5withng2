import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: '<h1>Welcome page for {{message}}</h1>'
})

export class AppComponent {
    message: string;
    constructor() {
        this.message = "ASP.NET 5 and Angular 2";
    }
}