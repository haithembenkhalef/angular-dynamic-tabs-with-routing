import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TabContentComponent } from '../tab-content/tab-content.component';
import { TabManagerService } from '../tab-manager.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('vcr', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  tabId!: number;
  tab!: any;
  content!: any;
  subscription!: Subscription;

  constructor(private manager: TabManagerService, private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tabId = this.route.snapshot.params['id'];
    this.subscription = this.manager.onTabActivate.subscribe((data) => this.disableAll());
    let tabRefContent = this.manager.getTabContentByID(this.tabId);
    if (tabRefContent) {
      this.tab = tabRefContent[0];
      this.content = tabRefContent[1];
    }
  }

  ngAfterViewInit(): void {
    this.generateContent();
  }

  generateContent() {
    if (this.content) {
      console.log(this.content.hostView)
      this.vcr.insert(this.content.hostView);
    }
    else {
      this.content = this.vcr.createComponent(TabContentComponent);
      this.content.instance.content = this.tab.instance.tab.label + " : " + this.tab.instance.tab.id;
      this.changeDetectorRef.detectChanges();
      this.manager.addRef(this.tab, this.content);
    }
  }

  disableAll() {
    while (this.vcr.length > 0)
      this.vcr.detach();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
