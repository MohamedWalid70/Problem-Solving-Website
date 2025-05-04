import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Problem, getDifficultyText } from '../../Interfaces/Problem';
import { ProblemsService } from '../../services/ProblemsService/problems.service';
import { Submission } from '../../Interfaces/Submission';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-problem-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './problem-editor.component.html',
  styleUrl: './problem-editor.component.css'
})
export class ProblemEditorComponent implements OnInit {
  
  id: number = 0;
  solution: string = '';
  Problem : Problem | undefined;
  submissionResult: any = null;

  constructor(
    private _ProblemsService: ProblemsService,
    private route: ActivatedRoute
  ) {
    this._ProblemsService = inject(ProblemsService);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      console.log('Problem ID:', this.id);
      
      this._ProblemsService.getProblem(this.id).subscribe(
        {
          next : (receivedProblem) => {
            this.Problem = receivedProblem;
            // if (this.Problem) {
            //   this.solution = this.Problem.best_Solution;
            // }
          },
          error : (response) => {
            console.log(response.error);
          }
        });
    });
  }

  submitSolution() {
    const submission: Submission = {
      problemId: this.id,
      userId: (localStorage.getItem('userId'))?.toString(),
      code: this.solution,
      languageId: 1
    };  

    this._ProblemsService.SubmitProblem(submission).subscribe({
      next : (response) => {
        console.log(response);
        this.submissionResult = {
          status: response?.success === true ? 'success' : 'failure',
          message: response.message,
          evaluation: response?.aievaluation?.iscorrect ? 'incorrect' : 'correct',
          successRate: response?.aievaluation?.successrate,
          feedback: response?.aievaluation?.feedback,
          correctAnswer: response?.aievaluation?.correctsolution
        };
        console.log(this.submissionResult);
      },
      error : (response) => {
        console.log(response.error);
        this.submissionResult = {
          status: 'error',
          message: response.error || 'An error occurred while submitting your solution.'
        };
      }
    });
  }

  getDifficultyClass(level: number): string {
    const difficulty = getDifficultyText(level).toLowerCase();
    return `difficulty-${difficulty}`;
  }

  getDifficultyText(level: number): string {
    return getDifficultyText(level);
  }
}
