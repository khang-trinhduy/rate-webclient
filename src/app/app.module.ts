import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { LoginComponent } from "./modules/interest/login/login.component";
import { RegisterComponent } from "./modules/interest/register/register.component";
import { SubscribeComponent } from "./layout/subscribe/subscribe.component";
import { InterestModule } from "./modules/interest/interest.module";
import { MobileModule } from "./modules/mobile/mobile.module";
import { MaterialsModule } from "./modules/materials/materials.module";
import { BasicModule } from "./shared/basic/basic.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DashboardModule } from './modules/dashboard/dashboard.module';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    SubscribeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InterestModule,
    MobileModule,
    MaterialsModule,
    BasicModule,
    DashboardModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
