import { NgModule } from "@angular/core";
import { InterestComponent } from "src/app/modules/interest/interest/interest.component";
import { RowComponent } from "src/app/modules/interest/row/row.component";
import { RouterModule, Routes } from "@angular/router";
import { CellComponent } from "src/app/modules/interest/cell/cell.component";
import { MaterialsModule } from "../materials/materials.module";
import { BasicModule } from "src/app/shared/basic/basic.module";
import { HighestComponent } from "src/app/modules/interest/highest/highest.component";
import { SdetailComponent } from "src/app/modules/interest/sdetail/sdetail.component";
import { DetailComponent } from "src/app/modules/interest/detail/detail.component";
import { CriteriaComponent } from "src/app/modules/interest/criteria/criteria.component";
const routes: Routes = [
  {
    path: "",
    component: InterestComponent,
  },
  { path: "highest", component: HighestComponent },
  { path: "criteria", component: CriteriaComponent },
  { path: "detail", component: DetailComponent },
];
@NgModule({
  declarations: [
    InterestComponent,
    RowComponent,
    CellComponent,
    HighestComponent,
    DetailComponent,
    SdetailComponent,
    CriteriaComponent,
  ],
  imports: [BasicModule, MaterialsModule, RouterModule.forChild(routes)],
  exports: [InterestComponent],
  entryComponents: [SdetailComponent],
})
export class InterestModule {}
