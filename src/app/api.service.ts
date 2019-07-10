import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Person } from './person';
import { Bus } from './bus';
import { BusRoute } from './bus-route';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "http://sabarna17.pythonanywhere.com";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: string;
  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get('auth-token').then(res => {
      if (res) {
        this.token = res;
      }
    })
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getBuses(): Observable<Bus> {
    const url = `${apiUrl}/bus/${this.token}`;
    return this.http.get<Bus>(url).pipe(
      tap(_ => console.log(`fetched Buses`)),
      catchError(this.handleError<Bus>(`getBuses`))
    );
  }

  getBus(id): Observable<Bus> {
    const url = `${apiUrl}/bus/${this.token}/${id}`;
    return this.http.get<Bus>(url).pipe(
      tap(_ => console.log(`fetched Bus id=${id}`)),
      catchError(this.handleError<Bus>(`getBus id=${id}`))
    );
  }

  addBus(Bus): Observable<any> {
    let busObj = {
      "BUSID": Bus.busid,
      "DRIVER": Bus.driver,
      "ROUTEID": Bus.routeid,
      "CONTACT": Bus.contactno,
      "USERID": this.token
    };
    console.log(busObj);
    const url = `${apiUrl}/bus`;
    return this.http.post<any>(url, busObj, httpOptions)
      .pipe(
        tap((res: any) => console.log(res)),
        catchError(this.handleError<any>('addBus'))
      );
  }

  updateBus(id, Bus): Observable<any> {
    const url = `${apiUrl}/bus/${id}`;
    return this.http.put(url, Bus, httpOptions).pipe(
      tap(_ => console.log(`updated Bus id=${id}`)),
      catchError(this.handleError<any>('updateBus'))
    );
  }

  deleteBus(id): Observable<Bus> {
    const url = `${apiUrl}/bus/${id}`;

    return this.http.delete<Bus>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Bus id=${id}`)),
      catchError(this.handleError<Bus>('deleteBus'))
    );
  }


  getBusRoutes(): Observable<BusRoute> {
    const url = `${apiUrl}/bus_route/${this.token}`;
    return this.http.get<BusRoute>(url).pipe(
      tap(_ => console.log(`fetched Busroutes`)),
      catchError(this.handleError<BusRoute>(`getBusRoutes`))
    );
  }

  
  getBusRoute(routeId): Observable<BusRoute> {
    const url = `${apiUrl}/bus_route/${this.token}/`+routeId;
    return this.http.get<BusRoute>(url).pipe(
      tap(_ => console.log(`fetched Busroute`)),
      catchError(this.handleError<BusRoute>(`getBusRoutes`))
    );
  }

  addBusRoute(route): Observable<any> {
    let busObj = {
      "USERID": this.token,
      "ROUTEID": route.routeid,
      "DEST1": route.dest1,
      "DEST2": route.dest2,
      "DEST3": route.dest3,
      "DEST4": route.dest4,
      "DEST5": route.dest5
    };
    console.log(busObj);
    const url = `${apiUrl}/bus_route`;
    return this.http.post<any>(url, busObj, httpOptions)
      .pipe(
        tap((res: any) => console.log(res)),
        catchError(this.handleError<any>('addBusRoute'))
      );
  }

  getPersons(): Observable<Person> {
    const url = `${apiUrl}/person/${this.token}`;
    return this.http.get<Person>(url).pipe(
      tap(_ => console.log(`fetched persons`)),
      catchError(this.handleError<Person>(`getPersons`))
    );
  }

  addPerson(person): Observable<any> {
    let busObj = {
      "USERID": this.token,
      "PERSONID": person.personid,
      "BUSID": person.busid,
      "PERSONNAME": person.personname,
      "CONTACT": person.contact,
      "PASS": person.pass,
      "STOP": person.stop
    };
    console.log(busObj);
    const url = `${apiUrl}/person`;
    return this.http.post<any>(url, busObj, httpOptions)
      .pipe(
        tap((res: any) => console.log(res)),
        catchError(this.handleError<any>('addBus'))
      );
  }

  // getUser(id): Observable<User> {
  //   const url = `${apiUrl}/user/${id}`;
  //   return this.http.get<User>(url).pipe(
  //     tap(_ => console.log(`fetched User id=${id}`)),
  //     catchError(this.handleError<User>(`getUser id=${id}`))
  //   );
  // }

  // addUser (User): Observable<User> {
  //   return this.http.post<User>(apiUrl+'/user', User, httpOptions).pipe(
  //     tap((User: User) => console.log(`added User w/ id=${User.id}`)),
  //     catchError(this.handleError<User>('addUser'))
  //   );
  // }

  // updateUser (id, User): Observable<any> {
  //   const url = `${apiUrl}/user/${id}`;
  //   return this.http.put(url, User, httpOptions).pipe(
  //     tap(_ => console.log(`updated User id=${id}`)),
  //     catchError(this.handleError<any>('updateUser'))
  //   );
  // }

  // deleteUser (id): Observable<User> {
  //   const url = `${apiUrl}/user/${id}`;

  //   return this.http.delete<User>(url, httpOptions).pipe(
  //     tap(_ => console.log(`deleted User id=${id}`)),
  //     catchError(this.handleError<User>('deleteUser'))
  //   );
  // }

}
