import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { LoginComponent } from "./layout/login/login.component";
import { RegisterComponent } from "./layout/register/register.component";
import { SubscribeComponent } from "./layout/subscribe/subscribe.component";
import { InterestModule } from "./modules/interest/interest.module";
import { MobileModule } from "./modules/mobile/mobile.module";
import { MaterialsModule } from "./modules/materials/materials.module";
import { BasicModule } from "./shared/basic/basic.module";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    SubscribeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InterestModule,
    MobileModule,
    MaterialsModule,
    BasicModule
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
