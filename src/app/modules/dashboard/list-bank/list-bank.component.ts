import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { merge, Observable, of as observableOf } from 'rxjs'
import { catchError, switchMap, startWith, map } from 'rxjs/operators'
import { RateService } from 'src/app/services/rate.service'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-list-bank',
  templateUrl: './list-bank.component.html',
  styleUrls: ['./list-bank.component.sass'],
})
export class ListBankComponent implements AfterViewInit {
  displayedColumns: string[] = ['STT', 'Name', 'Code', 'Created']
  dataSource: MatTableDataSource<any>

  resultsLength = 0
  isLoadingResults = true
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  @ViewChild(MatSort, { static: false }) sort: MatSort
  constructor(private rateService: RateService) {}

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
}
