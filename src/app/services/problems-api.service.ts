import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemAPI } from '../Interfaces/ProblemAPI';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProblemsApiService {
  private baseUrl = `${environment.baseUrl}/api/Problem`;

  constructor(private http: HttpClient) {}

  getProblems(): Observable<ProblemAPI[]> {
    return this.http.get<ProblemAPI[]>(`${this.baseUrl}/getProblems`);
  }

  getProblem(id: number): Observable<ProblemAPI> {
    return this.http.get<ProblemAPI>(`${this.baseUrl}/getProblem/${id}`);
  }

  addProblem(problem: ProblemAPI): Observable<ProblemAPI> {
    return this.http.post<ProblemAPI>(`${this.baseUrl}/addProblem`, problem, {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })});
  }

  updateProblem(id: number, problem: ProblemAPI): Observable<ProblemAPI> {
    return this.http.put<ProblemAPI>(
      `${this.baseUrl}/updateProblem/${id}`,
      problem, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })}
    );
  }

  deleteProblem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteProblem/${id}`, {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })});
  }
}
