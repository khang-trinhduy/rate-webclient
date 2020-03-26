import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MInterestComponent } from "src/app/mobile/m-interest/m-interest.component";
import { RouterModule, Routes } from "@angular/router";
import { MRecommendComponent } from "src/app/mobile/m-recommend/m-recommend.component";
import { MServiceComponent } from "src/app/mobile/m-service/m-service.component";
import { MPolicyComponent } from "src/app/mobile/m-policy/m-policy.component";
import { MCompareComponent } from "src/app/mobile/m-compare/m-compare.component";
import { MDetailComponent } from "src/app/mobile/m-detail/m-detail.component";
import { MaterialsModule } from "../materials/materials.module";
import { BasicModule } from "src/app/shared/basic/basic.module";
import { LoginComponent } from "src/app/layout/login/login.component";
import { RegisterComponent } from "src/app/layout/register/register.component";
import { SubscribeComponent } from "src/app/layout/subscribe/subscribe.component";
import { MPolicyDetailComponent } from "src/app/mobile/m-policy-detail/m-policy-detail.component";
import { MConsultComponent } from "src/app/mobile/m-consult/m-consult.component";
import { MDownloadComponent } from "src/app/mobile/m-download/m-download.component";
const routes: Routes = [
  {
    path: "mobile",
    component: MInterestComponent
  },
  { path: "recommend", component: MRecommendComponent },
  { path: "service", component: MServiceComponent },
  { path: "policy", component: MPolicyComponent },
  { path: "compare", component: MCompareComponent },
  { path: "signin", component: LoginComponent },
  { path: "signup", component: RegisterComponent },
  { path: "register", component: SubscribeComponent }
];
@NgModule({
  declarations: [
    MInterestComponent,
    MRecommendComponent,
    MServiceComponent,
    MPolicyComponent,
    MCompareComponent,
    MDetailComponent,
    MPolicyDetailComponent,
    MDownloadComponent,
    MConsultComponent
  ],
  imports: [BasicModule, RouterModule.forChild(routes), MaterialsModule],
  exports: [MInterestComponent],
  entryComponents: [
    MDetailComponent,
    MPolicyDetailComponent,
    MDownloadComponent,
    MConsultComponent
  ]
})
export class MobileModule {}
