import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicComp]'
})
export class DynamicCompDirective {


  constructor(public viewRef: ViewContainerRef) {
  }

}
