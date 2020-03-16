import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, of, Observer } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  httpHeaderOptions = new HttpHeaders({
    "Content-type": "application/json"
  });
  
  constructor(private http: HttpClient, private auth: AuthService) {}
  
  subscribe(form: any): Observable<any> {
    return this.http
      .post(`${environment.api}/users`, form)
      .pipe(catchError(this.handleError<any>("SUBSCRIBE")));
  }
  signIn(model): Observable<any> {
    return this.http
      .post<any>(`${environment.api}/login`, model, {
        headers: this.httpHeaderOptions
      })
      .pipe(catchError(this.handleError<any>("SIGN IN")));
  }

  signUp(model): Observable<any> {
    return this.http
      .post<any>(`${environment.api}/register`, model, {
        headers: this.httpHeaderOptions
      })
      .pipe(catchError(this.handleError<any>("REGISTER")));
  }

  signOut() {
    this.auth.removeToken();
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
