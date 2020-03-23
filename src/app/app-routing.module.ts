import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InterestComponent } from "./layout/interest/interest.component";
import { DetailComponent } from "./layout/detail/detail.component";
import { LoginComponent } from "./layout/login/login.component";
import { RegisterComponent } from "./layout/register/register.component";
import { SubscribeComponent } from "./layout/subscribe/subscribe.component";
import { HighestComponent } from "./layout/highest/highest.component";
import { CriteriaComponent } from "./layout/criteria/criteria.component";
import { UpdateComponent } from "./components/update/update.component";
import { MCompareComponent } from './mobile/m-compare/m-compare.component';
import { MPolicyComponent } from './mobile/m-policy/m-policy.component';
import { MServiceComponent } from './mobile/m-service/m-service.component';
import { MRecommendComponent } from './mobile/m-recommend/m-recommend.component';

const routes: Routes = [
  { path: "", component: InterestComponent },
  { path: "detail", component: DetailComponent },
  { path: "signin", component: LoginComponent },
  { path: "signup", component: RegisterComponent },
  { path: "register", component: SubscribeComponent },
  { path: "highest", component: HighestComponent },
  { path: "criteria", component: CriteriaComponent },
  { path: "update", component: UpdateComponent },
  { path: "recommend", component: MRecommendComponent },
  { path: "service", component: MServiceComponent },
  { path: "policy", component: MPolicyComponent },
  { path: "compare", component: MCompareComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
