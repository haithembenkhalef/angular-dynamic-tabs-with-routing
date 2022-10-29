import { Component, EventEmitter, OnInit } from '@angular/core';
import { Tab } from '../models/tab';



@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent implements OnInit {

  click: EventEmitter<any> = new EventEmitter<any>();
  close: EventEmitter<any> = new EventEmitter<any>();

  tab: Tab = {
    id: 0,
    label: "Tab",
    active: false
  }

  constructor() { }

  ngOnInit(): void {
  }

}
