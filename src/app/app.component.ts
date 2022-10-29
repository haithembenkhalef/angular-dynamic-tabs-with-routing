import { Component, ComponentRef, Directive, OnInit, Type, ViewChild } from '@angular/core';
import {Message,MessageService} from 'primeng/api';
import { PrimeNGConfig} from 'primeng/api';                  //api
import { ItemComponent } from './comp.model';
import { DynamicCompDirective } from './dynamic-comp.directive';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  
  activeState: boolean[] = [true, false, false];

    constructor(private messageService: MessageService) {}
  ngOnInit(): void {

    
  }



}
