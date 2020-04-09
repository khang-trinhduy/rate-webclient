import { Component, OnInit, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AddBankComponent } from '../add-bank/add-bank.component'
import { RateService } from 'src/app/services/rate.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'
import { AddRateComponent } from '../add-rate/add-rate.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  observables: Subscription[] = []

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
              this._snackBar.open(`Rate ${res.bank}-${res.period}-${res.value} created`, 'Close', {
                duration: 3000,
              })
            }
          })
        )
      }
    })
  }
}
