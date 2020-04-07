import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InterestModule } from "./modules/interest/interest.module";
import { MobileModule } from "./modules/mobile/mobile.module";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/interest/interest.module").then((m) => InterestModule),
  },
  {
    path: "mobile",
    loadChildren: () =>
      import("./modules/mobile/mobile.module").then((m) => m.MobileModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), InterestModule, MobileModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
