import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InterestComponent } from "./layout/interest/interest.component";
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [{ path: "", component: InterestComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
