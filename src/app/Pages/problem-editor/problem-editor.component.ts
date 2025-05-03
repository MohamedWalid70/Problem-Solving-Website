import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Problem } from '../../Interfaces/Problem';
import * as problemsFile from '../../../assets/problems.json';
import { ProblemsService } from '../../services/problems.service';
import { Submission } from '../../Interfaces/Submission';


@Component({
  selector: 'app-problem-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './problem-editor.component.html',
  styleUrl: './problem-editor.component.css'
})
export class ProblemEditorComponent implements OnInit {
  
  @Input() id !: string;
  solution: string = '';
  // private _ProblemService: ProblemsService;

  Problem : Problem | undefined;

  constructor() {
    // this._ProblemService = inject(ProblemsService);
  }

  ngOnInit() {
    
    this.Problem = problemsFile.problems.find(problem => problem.id === Number(this.id));

    if (this.Problem) {
      this.solution = this.Problem.initialCode;
    }
  }

  submitSolution() {
    // TODO: Implement solution submission
    console.log('Submitting solution:', {
      problemId: this.id,
      solution: this.solution
    });

    const submission: Submission = {
      problemId: this.id,
      userId: 1,
      code: this.solution,
      languageId: 1
    };
    
    // this._ProblemService.SubmitProblem(submission).subscribe();
  }

  getDifficultyClass(difficulty: string): string {
    switch(difficulty) {
      case 'Easy':
        return 'difficulty-easy';
      case 'Medium':
        return 'difficulty-medium';
      case 'Hard':
        return 'difficulty-hard';
      default:
        return '';
    }
  }
}
