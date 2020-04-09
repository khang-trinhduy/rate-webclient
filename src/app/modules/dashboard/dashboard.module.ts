import { NgModule } from '@angular/core'
import { AddRateComponent } from './add-rate/add-rate.component'
import { ListRateComponent } from './list-rate/list-rate.component'
import { DeleteRateComponent } from './delete-rate/delete-rate.component'
import { HomeComponent } from './home/home.component'
import { Routes, Router, RouterModule } from '@angular/router'
import { BasicModule } from 'src/app/shared/basic/basic.module'
import { MaterialsModule } from '../materials/materials.module'
import { DeleteBankComponent } from './delete-bank/delete-bank.component'
import { AddBankComponent } from './add-bank/add-bank.component'
import { ListBankComponent } from './list-bank/list-bank.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rate', component: ListRateComponent },
  { path: 'bank/:id', component: ListRateComponent },
  { path: '**', redirectTo: '' },
]

@NgModule({
  declarations: [
    AddRateComponent,
    ListRateComponent,
    DeleteRateComponent,
    AddBankComponent,
    DeleteBankComponent,
    ListBankComponent,
    HomeComponent,
  ],
  imports: [MaterialsModule, BasicModule, RouterModule.forChild(routes)],
  entryComponents: [AddBankComponent, AddRateComponent],
  exports: [HomeComponent],
})
export class DashboardModule {}
