import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { HomeComponent } from "./layout/home/home.component";
import { DashboardComponent } from "./user/dashboard/dashboard.component";
import { TableComponent } from "./components/table/table.component";
import { ChartComponent } from "./components/chart/chart.component";
import { FilterComponent } from "./components/filter/filter.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { RateComponent } from "./user/rate/rate.component";
import { FormComponent } from "./components/form/form.component";
import { InterestComponent } from "./layout/interest/interest.component";
import { LoanComponent } from "./layout/loan/loan.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TableComponent,
    ChartComponent,
    FilterComponent,
    ProfileComponent,
    RateComponent,
    FormComponent,
    InterestComponent,
    LoanComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
