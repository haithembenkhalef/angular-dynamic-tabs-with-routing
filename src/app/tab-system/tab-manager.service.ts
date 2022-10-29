import { ComponentRef, EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabManagerService {

  private tabsRef: Map<any,any> = new Map();

  onTabActivate: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  addRef(key: any, content: any) {
    this.tabsRef.set(key, content);
  }

  getRefs() {
    return this.tabsRef;
  }

  findRef(key: any) {
    return this.tabsRef.get(key);
  }

  disableAll() {
    for (let key of this.tabsRef.keys()) 
        key.instance.tab.active = false;
  }

  setActive(key: any) {
    this.onTabActivate.emit(true);
    key.instance.tab.active = true;
  }

  remove(key: any) {
    this.tabsRef.delete(key);
  }

  getNextTab(key: any) {
   let tabs = Array.from(this.tabsRef.keys());
   let index = tabs.findIndex(element=>element.instance.tab.id === key.instance.tab.id);
   if(index > 0 ) 
    return tabs[index - 1];
   else 
    return tabs[index + 1] ? tabs[index + 1] : null;
  }

  getActiveTab() {
    let tabs = Array.from(this.tabsRef.keys());
    return tabs.find(element => 
      element.instance.tab.active === true
     );
  }


  getTabContentByID(id: number) {
    for(let [key,value] of this.tabsRef){
      if(key.instance.tab.id == id)  {
        return [key,value];
      }
        
    }
    return null;
  }


}
