import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

// import { } from '@capacitor/preferences';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  token = '';

  constructor(private http: HttpClient) {
    // this.loadToken();
  }

  async loadToken() {
    // const token = await Preferences.get({ key: TOKEN_KEY });
    // if (token && token.value) {
    //   console.log('set token: ', token.value);
    //   this.token = token.value;
    //   this.isAuthenticated.next(true);
    //   console.log('is authenticated');
    // } else {
    //   this.isAuthenticated.next(false);
    //   console.log('not authenticated');
    // }
  }

  login(credentials: { email: any; password: any }): Observable<any> {
    return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
      map((data: any) => data.token),
      switchMap((token) => {
        console.log(token);

        // return from(Preferences.set({ key: TOKEN_KEY, value: token }));

        return token;
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }

  signup(data: any) {
    console.log('user registering', data);

    const path = 'createChamber';
    return this.http.post<any>(path, data);
  }

  // logout(): Promise<void> {
  //   this.isAuthenticated.next(false);
  //   return Preferences.remove({ key: TOKEN_KEY });
  // }
}
