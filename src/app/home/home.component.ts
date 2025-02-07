import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {HeaderComponent} from "@shared/header/header.component";

@Component({
    selector: 'app-home',
    imports: [
        RouterLink,
        HeaderComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
