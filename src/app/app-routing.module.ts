import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InterestComponent } from "./layout/interest/interest.component";
import { HomeComponent } from "./layout/home/home.component";
import { DetailComponent } from "./layout/detail/detail.component";
import { LoginComponent } from "./layout/login/login.component";
import { RegisterComponent } from "./layout/register/register.component";

const routes: Routes = [
  { path: "", component: InterestComponent },
  { path: "detail", component: DetailComponent },
  { path: "signin", component: LoginComponent },
  { path: "signup", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
