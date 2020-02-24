import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InterestComponent } from "./layout/interest/interest.component";
import { HomeComponent } from "./layout/home/home.component";
import { DetailComponent } from "./layout/detail/detail.component";

const routes: Routes = [
  { path: "", component: InterestComponent },
  { path: "detail", component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
