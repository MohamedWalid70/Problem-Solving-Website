import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as problemsFile from '../../../assets/problems.json';
import { Problem } from '../../Interfaces/Problem';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-problems-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './problems-list.component.html',
  styleUrl: './problems-list.component.css'
})
export class ProblemsListComponent {
  
  SearchedProblemTitle: string = '';
  SearchedProblemDifficulty: string = '';

  problems: Problem[];

  constructor(private router: Router) {
    this.problems =  problemsFile.problems;
  }

  ngOnInit() {

  }

  navigateToProblem(id: number) {
    // Store the problem in a service or state management
    // For now, we'll pass it as a query parameter
    this.router.navigate(['/problem-item', id]);
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


  SearchProblems() {
    if (this.SearchedProblemTitle) {
      this.problems = this.problems.filter(problem => problem.title.toLowerCase().includes(this.SearchedProblemTitle.toLowerCase()));
    } else {
      this.problems = problemsFile.problems;
    }
  }

  GroupProblems() {
    this.problems = problemsFile.problems;
    if (this.SearchedProblemDifficulty) {
      this.problems = this.problems.filter(problem => problem.difficulty === this.SearchedProblemDifficulty);
    } else {
      this.problems = problemsFile.problems;
    }
  }

}
