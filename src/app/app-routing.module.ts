import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InterestModule } from "./modules/interest/interest.module";
import { MobileModule } from "./modules/mobile/mobile.module";

const routes: Routes = [
  {
    path: "interest",
    loadChildren: () => import("./modules/interest/interest.module")
  },
  {
    path: "mobile",
    loadChildren: () => import("./modules/mobile/mobile.module")
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), InterestModule, MobileModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
