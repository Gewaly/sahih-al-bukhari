import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class HadithApiService {
  private url = `${environment.apiUrl}/ara-bukhari.json`;

  constructor(private http: HttpClient) { }

  getBook() {
    return this.http.get<any>(this.url);
  }
}
