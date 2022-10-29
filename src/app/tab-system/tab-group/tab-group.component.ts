import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Tab } from '../models/tab';
import { TabContentComponent } from '../tab-content/tab-content.component';
import { TabItemComponent } from '../tab-item/tab-item.component';
import { TabManagerService } from '../tab-manager.service';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {

  @ViewChild('vcrTab', { read: ViewContainerRef }) vcrTab!: ViewContainerRef;

  @ViewChild('vcr', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  @ViewChild('scroller', { read: ViewContainerRef, static: true })
  scroller!: ViewContainerRef;

  constructor(private manager: TabManagerService, private router: Router) { }

  ngOnInit(): void {
  }

  addTab() {
    if (this.vcrTab) {
      this.disableAll();
      const tabRef = this.vcrTab.createComponent(TabItemComponent);
      //simulating id generation (normally id come from backend)
      tabRef.instance.tab.id = Math.floor(Math.random() * 100);
      tabRef.instance.click.subscribe((data) => {
        this.disableAll();
        this.setActive(tabRef)
      });
      tabRef.instance.close.subscribe((data) => {
        this.destroy(tabRef);
      })
      this.manager.addRef(tabRef, null)
      this.setActive(tabRef);
      if (this.checkOverflow()) setTimeout(() => this.scrollToElement(), 500);
    }
  }

  disableAll() {
    this.manager.disableAll();
  }

  setActive(key: any) {
    this.manager.setActive(key);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigateByUrl('tab/' + key.instance.tab.id));

  }

  destroy(key: any) {
    if (key.instance.tab.active) {
      this.disableAll();
      let newKey = this.manager.getNextTab(key);
      if (newKey) this.setActive(newKey);
    }
    let content = this.manager.findRef(key)
    this.manager.remove(key);
    key.destroy();
    content.destroy();
    if(!this.manager.getActiveTab())  this.router.navigateByUrl('/');
  }

  scrollRight() {
    this.scroller.element.nativeElement.scroll({ left: (this.scroller.element.nativeElement.scrollLeft + 130), behavior: 'smooth' });
  }

  scrollLeft() {
    this.scroller.element.nativeElement.scroll({ left: (this.scroller.element.nativeElement.scrollLeft - 130), behavior: 'smooth' });
  }

  public checkOverflow(): boolean {
    return this.scroller.element.nativeElement.offsetWidth < this.scroller.element.nativeElement.scrollWidth;
  }

  scrollToEnd() {
    this.scroller.element.nativeElement.scroll({ left: (this.scroller.element.nativeElement.scrollWidth), behavior: 'smooth' });
  }

  scrollToElement() {
    let tabRef = this.manager.getActiveTab();
    if (tabRef)
      tabRef.location.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

}


