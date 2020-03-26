import { NgModule } from "@angular/core";
import { InterestComponent } from "src/app/layout/interest/interest.component";
import { RowComponent } from "src/app/components/row/row.component";
import { RouterModule, Routes } from "@angular/router";
import { CellComponent } from "src/app/components/cell/cell.component";
import { MaterialsModule } from "../materials/materials.module";
import { BasicModule } from "src/app/shared/basic/basic.module";
import { HighestComponent } from "src/app/layout/highest/highest.component";
import { SdetailComponent } from "src/app/sdetail/sdetail.component";
import { DetailComponent } from "src/app/layout/detail/detail.component";
import { CriteriaComponent } from "src/app/layout/criteria/criteria.component";
import { LoginComponent } from "src/app/layout/login/login.component";
import { RegisterComponent } from "src/app/layout/register/register.component";
import { SubscribeComponent } from "src/app/layout/subscribe/subscribe.component";
const routes: Routes = [
  {
    path: "",
    component: InterestComponent
  },
  { path: "highest", component: HighestComponent },
  { path: "criteria", component: CriteriaComponent },
  { path: "signin", component: LoginComponent },
  { path: "signup", component: RegisterComponent },
  { path: "register", component: SubscribeComponent }
];
@NgModule({
  declarations: [
    InterestComponent,
    RowComponent,
    CellComponent,
    HighestComponent,
    DetailComponent,
    SdetailComponent,
    CriteriaComponent
  ],
  imports: [BasicModule, MaterialsModule, RouterModule.forChild(routes)],
  exports: [InterestComponent],
  entryComponents: [SdetailComponent]
})
export class InterestModule {}
