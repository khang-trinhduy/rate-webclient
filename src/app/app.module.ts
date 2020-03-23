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
import { RowComponent } from "./components/row/row.component";
import { BookmarkComponent } from "./components/bookmark/bookmark.component";
import { MatIconModule } from "@angular/material/icon";
import { ChangeComponent } from "./components/change/change.component";
import { DetailComponent } from "./layout/detail/detail.component";
import { InfoComponent } from "./components/info/info.component";
import { SearchComponent } from "./components/search/search.component";
import { CardComponent } from "./components/card/card.component";
import { ContentComponent } from "./components/content/content.component";
import { MatSelectModule } from "@angular/material/select";
import { ChartsModule } from "ng2-charts";
import { LoginComponent } from "./layout/login/login.component";
import { RegisterComponent } from "./layout/register/register.component";
import { LineComponent } from "./components/line/line.component";
import { ReviewComponent } from "./components/review/review.component";
import { AddReviewComponent } from "./layout/add-review/add-review.component";
import { MatDialogModule } from "@angular/material/dialog";
import { AddInterestComponent } from "./layout/add-interest/add-interest.component";
import { AddLoanComponent } from "./layout/add-loan/add-loan.component";
import { AddBankComponent } from "./layout/add-bank/add-bank.component";
import { CellComponent } from "./components/cell/cell.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { SubscribeComponent } from "./layout/subscribe/subscribe.component";
import { MatMenuModule } from "@angular/material/menu";
import { HighestComponent } from "./layout/highest/highest.component";
import { CriteriaComponent } from "./layout/criteria/criteria.component";
import { SdetailComponent } from "./sdetail/sdetail.component";
import { UpdateComponent } from './components/update/update.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TableComponent,
    ChartComponent,
    FilterComponent,
    ProfileComponent,
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
    LoginComponent,
    RegisterComponent,
    LineComponent,
    ReviewComponent,
    AddReviewComponent,
    AddInterestComponent,
    AddLoanComponent,
    AddBankComponent,
    CellComponent,
    SubscribeComponent,
    HighestComponent,
    CriteriaComponent,
    SdetailComponent,
    UpdateComponent
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
    ChartsModule,
    MatDialogModule,
    InfiniteScrollModule,
    MatMenuModule
  ],
  entryComponents: [AddReviewComponent, SdetailComponent, AddInterestComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
