import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Language {
  languagesId: number;
  name: string;
  submissionId: number;
  submission: any;
}

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private baseUrl = 'https://localhost:7212/api/Languages';

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${this.baseUrl}/getLanguages`);
  }

  getLanguage(id: number): Observable<Language> {
    return this.http.get<Language>(`${this.baseUrl}/getLanguage/${id}`);
  }

  addLanguage(language: { name: string }): Observable<Language> {
    return this.http.post<Language>(`${this.baseUrl}/addLanguage`, language);
  }

  updateLanguage(id: number, language: { name: string }): Observable<Language> {
    return this.http.put<Language>(
      `${this.baseUrl}/updateLanguage/${id}`,
      language
    );
  }

  deleteLanguage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteLanguage/${id}`);
  }
}
