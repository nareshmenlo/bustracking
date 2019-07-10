import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
// import { toBase64String } from '@angular/compiler/src/output/source_map';

const TOKEN_KEY = 'auth-token';
const USERNAME = 'username';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  apiURL: string = 'http://sabarna17.pythonanywhere.com';
  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  elogin(username: string, password: string) {
    return this.http.get(this.apiURL + "/orgs/" + username, httpOptions).pipe(map((response: any) => {
      if (response.PASS === password) {
        this.storage.set(USERNAME, username);
        this.storage.set(TOKEN_KEY, username).then(() => {
          this.authenticationState.next(true);
        });
      } else {
        this.storage.remove(TOKEN_KEY).then(() => {
          this.authenticationState.next(false);
        });
      }
    })).subscribe();
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}