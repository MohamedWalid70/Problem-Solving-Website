import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Problem } from '../Interfaces/Problem';
import { Submission } from '../Interfaces/Submission';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {

  constructor(private http: HttpClient) { }

  getProblems() : Observable<Array<Problem>> {
    
    return this.http.get<Array<Problem>>('URL');
  }

  getProblem(id: string) : Observable<Problem> {
    return this.http.get<Problem>(`URL/${id}`);
  }

  SubmitProblem(submission: Submission) : Observable<Problem> {
    return this.http.post<Problem>('URL', submission);
  }
}
