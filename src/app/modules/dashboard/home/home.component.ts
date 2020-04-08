import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AddBankComponent } from '../add-bank/add-bank.component'
import { RateService } from 'src/app/services/rate.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private rateService: RateService
  ) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBankComponent, {
      width: 'auto',
      height: 'auto',
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open('Create bank successful', 'Close', {
          duration: 3000,
        })
      }
    })
  }
}
