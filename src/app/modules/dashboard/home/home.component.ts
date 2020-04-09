import { Component, OnInit, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AddBankComponent } from '../add-bank/add-bank.component'
import { RateService } from 'src/app/services/rate.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'
import { AddRateComponent } from '../add-rate/add-rate.component'
import { Bank } from 'src/app/models/rate'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  observables: Subscription[] = []
  tabIndex = 0
  selectedBank: Bank
  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private rateService: RateService
  ) {}
  ngOnDestroy(): void {
    this.observables.forEach((obs) => obs.unsubscribe())
  }

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBankComponent, {
      width: 'auto',
      height: 'auto',
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.observables.push(
          this.rateService.addBank(result).subscribe((res) => {
            if (res) {
              this._snackBar.open(`Bank ${res.name} created`, 'Close', {
                duration: 3000,
              })
            }
          })
        )
      }
    })
  }

  openAnotherDialog(): void {
    const dialogRef = this.dialog.open(AddRateComponent, {
      width: 'auto',
      height: 'auto',
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.observables.push(
          this.rateService.addRate(result).subscribe((res) => {
            if (res) {
              this._snackBar.open(
                `Rate { ${result.bank}-${result.period}-${result.value} } created`,
                'Close',
                {
                  duration: 3000,
                }
              )
            }
          })
        )
      }
    })
  }

  selectBankHandler = (bank) => {
    this.tabIndex = 1
    this.selectedBank = bank
  }

  changeTabIndex = (event) => {
    this.tabIndex = event
  }
}
