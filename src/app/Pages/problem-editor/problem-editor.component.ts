import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Problem, getDifficultyText } from '../../Interfaces/Problem';
import { ProblemsService } from '../../services/ProblemsService/problems.service';
import { Submission } from '../../Interfaces/Submission';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from '../../Interfaces/Language';
import { LanguagesService } from '../../services/languages.service';


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
  selectedLanguage: number = 1; // Default to JavaScript
  languages: Language[];
  TimeComplexity !: string;
  SpaceComplexity !: string;

  constructor(
    private _ProblemsService: ProblemsService,
    private route: ActivatedRoute, 
    private _router: Router,
    private _LanguagesService: LanguagesService
  ) {
    this._ProblemsService = inject(ProblemsService);
    this.languages = [];
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
        this._LanguagesService.getLanguages().subscribe(
          {
            next : (receivedLanguages) => {
              this.languages = receivedLanguages;
            }
            ,
            error : (response) => {
              console.log(response.error);
            }
          }
        );
    });
  }

  submitSolution() {
    const submission: Submission = {
      problemId: this.id,
      userId: (localStorage.getItem('userId'))?.toString(),
      code: this.solution,
      languageId: this.selectedLanguage
    };  

    this._ProblemsService.SubmitProblem(submission).subscribe({
      next : (response) => {
        console.log(response);
        this.submissionResult = {
          status: response?.success === true ? 'Success' : 'Failure',
          message: response.message,
          evaluation: response?.aiEvaluation?.iscorrect ? 'Incorrect' : 'Correct',
          successRate: response?.aiEvaluation?.successRate*10,
          feedback: response?.aiEvaluation?.feedback,
          correctAnswer: response?.aiEvaluation?.correctSolution
        };

        this.TimeComplexity = response?.aiEvaluation?.feedback?.substring(
            response?.aiEvaluation?.feedback.indexOf('Time'),
            response?.aiEvaluation?.feedback.indexOf('Space')
          );

        this.SpaceComplexity = response?.aiEvaluation?.feedback?.substring(
          response?.aiEvaluation?.feedback.indexOf('Space'),
          response?.aiEvaluation?.feedback.indexOf('Space') + 21
        );

        console.log(this.submissionResult);
      },
      error : (response) => {
        console.log(response);
        if(response.status === 0 ){
          this.submissionResult = {
            status: 'Submission error',
            message: 'In order to submit a solution, you need to be logged in.'
          };
          setTimeout(() => {
          this._router.navigate(['/login']);
          }, 2000);
        }
        else{
          this.submissionResult = {
            status: 'error',
            message: 'An error occurred while submitting your solution.' 
          };
        }
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
