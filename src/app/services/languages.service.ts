import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Language } from '../Interfaces/Language';


@Injectable({
  providedIn: 'root',
})
export class LanguagesService {

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${environment.baseUrl}/api/Languages/getLanguages`, 
      {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })});
  }

  getLanguage(id: number): Observable<Language> {
    return this.http.get<Language>(`${environment.baseUrl}/api/Languages/getLanguage/${id}`,
      {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })});
  }

  addLanguage(language: { name: string }): Observable<Language> {
    return this.http.post<Language>(`${environment.baseUrl}/api/Languages/addLanguage`, language, {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })});
  }

  updateLanguage(id: number, language: { name: string }): Observable<Language> {
    return this.http.put<Language>(
      `${environment.baseUrl}/api/Languages/updateLanguage/${id}`, 
      language,
      {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })}
    );
  }

  deleteLanguage(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/Languages/deleteLanguage/${id}`,
      {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })}
    );
  }
}
