import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import {TabViewModule} from 'primeng/tabview';
import { DynamicCompDirective } from './dynamic-comp.directive'
import {MenubarModule} from 'primeng/menubar';
import { TabSystemModule } from './tab-system/tab-system.module';




@NgModule({
  declarations: [
    AppComponent,
    DynamicCompDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    MessageModule,
    MenubarModule,
    AppRoutingModule,
    TabSystemModule

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
