import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { merge, Observable, of as observableOf, Subscription } from 'rxjs'
import { catchError, switchMap, startWith, map } from 'rxjs/operators'
import { RateService } from 'src/app/services/rate.service'
import { MatTableDataSource } from '@angular/material/table'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-list-bank',
  templateUrl: './list-bank.component.html',
  styleUrls: ['./list-bank.component.sass'],
})
export class ListBankComponent implements AfterViewInit {
  displayedColumns: string[] = ['Name', 'Code', 'Created', 'Rates', 'Action']
  dataSource: MatTableDataSource<any>

  observables: Subscription[] = []
  resultsLength = 0
  isLoadingResults = true
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  @ViewChild(MatSort, { static: false }) sort: MatSort
  @ViewChild(MatButton, { static: false }) button: MatButton
  @Output() onSelectBank: EventEmitter<any> = new EventEmitter<any>()
  constructor(private _snackbar: MatSnackBar, private rateService: RateService) {}

  ngAfterViewInit(): void {
    // If user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0))

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true
          return this.rateService.getSortedBanks(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          )
        }),
        map((data) => {
          this.isLoadingResults = false
          this.resultsLength = data.total_count
          return data.items
        }),
        catchError(() => {
          this.isLoadingResults = false
          return observableOf([])
        })
      )
      .subscribe((data) => (this.dataSource = new MatTableDataSource(data)))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  toDate = (date) => {
    if (date) {
      return date.split('T')[0].split('-').reverse().join('/')
    }
  }

  clear(id) {
    this.observables.push(
      this.rateService.deleteBank(id).subscribe((res) => {
        if (res === null) {
          this._snackbar.open(`Bank removed`, 'Close', {
            duration: 3000,
          })
        } else {
          this._snackbar.open(`Cannot remove bank`, 'Close', {
            duration: 3000,
          })
        }
      })
    )
  }

  selectBank(bank) {
    this.onSelectBank.emit(bank)
  }
}
