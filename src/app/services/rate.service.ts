import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { tap, map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RateService {
  httpHeaderOptions = new HttpHeaders({
    "Content-type": "application/json"
  });
  constructor(private http: HttpClient) {}

  getRates(): Observable<any> {
    return this.http
      .get(`${environment.api}`)
      .pipe(catchError(this.handleError<any>("GET RATES")));
  }

  getInterests(): Observable<any> {
    return this.http
      .get(`${environment.api}/interests`)
      .pipe(catchError(this.handleError<any>("GET INTERESTS")));
  }

  getLoans(): Observable<any> {
    return this.http
      .get(`${environment.api}/loans`)
      .pipe(catchError(this.handleError<any>("GET LOANS")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
