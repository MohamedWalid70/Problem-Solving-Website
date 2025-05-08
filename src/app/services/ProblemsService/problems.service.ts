import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Problem } from '../../Interfaces/Problem';
import { Submission } from '../../Interfaces/Submission';
import { environment } from '../../../environments/environment.development';
import { Language } from '../../Interfaces/Language';
import { SubmissionResponse } from '../../Interfaces/SubmissionResponse';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {

  constructor(private http: HttpClient) { }

  getProblems() : Observable<Array<Problem>> {
    
    return this.http.get<Array<Problem>>(`${environment.baseUrl}/api/Problem/getProblems`);
  }

  getProblem(id: number) : Observable<Problem> {
    return this.http.get<Problem>(`${environment.baseUrl}/api/Problem/getProblem/${id}`);
  }

  SubmitProblem(submission: Submission) : Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/Submission/submitCode`, submission,
       {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })});
  }

  getLanguages() : Observable<Array<Language>> {
    return this.http.get<Array<Language>>(`${environment.baseUrl}/api/Language/getLanguages`);
  }

  getUserSubmissions(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/Submission/getUserSubmissions`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

}
