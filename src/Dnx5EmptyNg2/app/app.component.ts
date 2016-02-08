import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    //template: '<h1>My Dnx5EmptyNg2 Angular 2 App</h1>'
    //template: '<h1>Welcome page for {{message}}</h1>'
    //template: '<h1>{{title}}</h1><h2>{{hero}} details!</h2>'
    template: `
    <button id='signin' (click)='onClickMe()'>sign-in</button>
    {{clickMessage}}`
})

export class AppComponent {
    //message: string;
    //constructor() {
    //    this.message = "My Dnx5WebAppNg2 Angular 2 App";
    //}
    //title: string = 'Tour of Heroes 1234', hero: string = 'Windstorm';

    clickMessage = '';

    onClickMe() {
        var buttonDisabled = document.getElementById('signin').getAttribute('disabled');
        //var buttonDisabled = document.querySelector('button.signinCss').getAttribute('disabled')

        document.getElementById('signin').setAttribute('disabled', 'disabled');
        //document.querySelector('button.signinCss').setAttribute('disabled', 'disabled');

        this.clickMessage = 'starting signin process';

        document.getElementById('signin').removeAttribute('disabled');  // not setAttribute('disabled', null);
        //document.querySelector('button.signinCss').removeAttribute('disabled');  // not setAttribute('disabled', null);

        this.clickMessage = 'done signin process';
    }
}