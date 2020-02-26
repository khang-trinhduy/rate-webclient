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
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { SettingComponent } from "./components/setting/setting.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { RowComponent } from './components/row/row.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { MatIconModule } from "@angular/material/icon";
import { ChangeComponent } from './components/change/change.component';
import { DetailComponent } from './layout/detail/detail.component';
import { InfoComponent } from './components/info/info.component';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from './components/card/card.component';
import { ContentComponent } from './components/content/content.component';
import { NewComponent } from './components/new/new.component';
import { MatSelectModule } from "@angular/material/select";
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { LineComponent } from './components/line/line.component';
import { ReviewComponent } from './components/review/review.component';
import { AddReviewComponent } from './layout/add-review/add-review.component';
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
    DashboardComponent,
    SettingComponent,
    RowComponent,
    BookmarkComponent,
    ChangeComponent,
    DetailComponent,
    InfoComponent,
    SearchComponent,
    CardComponent,
    ContentComponent,
    NewComponent,
    LoginComponent,
    RegisterComponent,
    LineComponent,
    ReviewComponent,
    AddReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
