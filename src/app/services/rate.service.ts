import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment'
import { tap, map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class RateService {
  deleteBank(id: any) {
    return this.http
      .delete(`${environment.api}/banks/${id}`, { headers: this.httpHeaderOptions })
      .pipe(catchError(this.handleError<any>('DELETE BANK')))
  }
  httpHeaderOptions = new HttpHeaders({
    'Content-type': 'application/json',
  })
  constructor(private http: HttpClient) {}

  getRecommends(size: number, except: number = 0): Observable<any> {
    return this.http
      .get(`${environment.api}/rates/recommend?size=${size}&exp=${except}`)
      .pipe(catchError(this.handleError<any>('GET RECOMMENDS')))
  }
  searchRates(value): Observable<any> {
    return this.http
      .get(`${environment.api}/rates/search?value=${value}`, {
        headers: this.httpHeaderOptions,
      })
      .pipe(catchError(this.handleError<any>('SEARCH RATES')))
  }

  addRate(form): Observable<any> {
    return this.http
      .post(`${environment.api}/rates`, form, {
        headers: this.httpHeaderOptions,
      })
      .pipe(catchError(this.handleError<any>('CREATE RATE')))
  }

  addBank(form): Observable<any> {
    return this.http
      .post(`${environment.api}/banks`, form, {
        headers: this.httpHeaderOptions,
      })
      .pipe(catchError(this.handleError<any>('CREATE BANK')))
  }

  deleteRate(id): Observable<any> {
    return this.http
      .delete(`${environment.api}/rates/${id}`, {
        headers: this.httpHeaderOptions,
      })
      .pipe(catchError(this.handleError<any>('DELETE RATE')))
  }

  getRates(): Observable<any> {
    return this.http.get(`${environment.api}`).pipe(catchError(this.handleError<any>('GET RATES')))
  }

  getRate(bank, period): Observable<any> {
    return this.http
      .get(`${environment.api}/rates?code=${bank}&period=${period}`)
      .pipe(catchError(this.handleError<any>('GET RATE')))
  }

  getRateById(code): Observable<any> {
    return this.http
      .get(`${environment.api}/rates/${code}`)
      .pipe(catchError(this.handleError<any>('GET RATE BY ID')))
  }

  getStat(period): Observable<any> {
    return this.http
      .get(`${environment.api}/stats?period=${period}`)
      .pipe(catchError(this.handleError<any>('GET STAT')))
  }

  getStats(): Observable<any> {
    return this.http
      .get(`${environment.api}/stats`)
      .pipe(catchError(this.handleError<any>('GET STATS')))
  }

  getBanks(pageSize, pageIndex): Observable<any> {
    return this.http
      .get(`${environment.api}/banks?size=${pageSize}&index=${pageIndex}`, {
        headers: this.httpHeaderOptions,
      })
      .pipe(catchError(this.handleError<any>('GET BANKS')))
  }

  getSortedBanks(sort: string, order: string, page: number): Observable<any> {
    return this.http
      .get(`${environment.api}/banks?sort=${sort}&order=${order}&page=${page}`)
      .pipe(catchError(this.handleError<any>('GET BANKS')))
  }

  searchBanks(keywords): Observable<any> {
    return this.http
      .get(`${environment.api}/banks/search?keywords=${keywords}`, {
        headers: this.httpHeaderOptions,
      })
      .pipe(catchError(this.handleError<any>('SEARCH BANKS')))
  }

  getDate(): Observable<any> {
    return this.http
      .get(`${environment.api}/update`)
      .pipe(catchError(this.handleError<any>('GET DATE')))
  }

  getBank(code, type = ''): Observable<any> {
    return this.http
      .get(`${environment.api}/banks/detail?code=${code}&type=${type}`)
      .pipe(catchError(this.handleError<any>('GET BANK')))
  }

  getBankById(code, type = ''): Observable<any> {
    return this.http
      .get(`${environment.api}/banks/${code}`)
      .pipe(catchError(this.handleError<any>('GET BANK BY ID')))
  }

  getTop(size, period = NaN, code = NaN): Observable<any> {
    return this.http
      .get(`${environment.api}/rates/top?size=${size}&period=${period}&code=${code}`, {
        headers: this.httpHeaderOptions,
      })
      .pipe(catchError(this.handleError<any>('GET TOP RATE')))
  }

  getReview(bankid): Observable<any> {
    return this.http
      .get(`${environment.api}/reviews?bank=${bankid}`, {
        headers: this.httpHeaderOptions,
      })
      .pipe(catchError(this.handleError<any>('GET REVIEWS')))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
