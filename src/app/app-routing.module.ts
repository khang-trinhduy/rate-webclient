import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { InterestModule } from './modules/interest/interest.module'
import { MobileModule } from './modules/mobile/mobile.module'

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/interest/interest.module#InterestModule',
  },
  {
    path: 'mobile',
    loadChildren: './modules/mobile/mobile.module#MobileModule',
  },
  {
    path: 'admin',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes), InterestModule, MobileModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
