import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Problem, getDifficultyText } from '../../Interfaces/Problem';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProblemsService } from '../../services/ProblemsService/problems.service';

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

  problems: Problem[] = [];
  loadedProblems: Problem[] = [];

  constructor(private router: Router, private _ProblemsService: ProblemsService) {
    this._ProblemsService.getProblems().subscribe({ 
      next: (receivedProblems) => {
        this.loadedProblems = receivedProblems;
        this.problems = this.loadedProblems;
      },
      error: (response) => {
        console.log(response.error);
      }
    });
  }

  ngOnInit() {

  }

  navigateToProblem(id: number) {
    this.router.navigate(['/problem-item', id]);
  }

  getDifficultyClass(level: number): string {
    const difficulty = this.getDifficultyText(level).toLowerCase();
    return `difficulty-${difficulty}`;
  }

  getDifficultyText(level: number): string {
    return getDifficultyText(level);
  }

  SearchProblems() {
    if (this.SearchedProblemTitle) {
      this.problems = this.loadedProblems.filter(problem => 
        problem.title.toLowerCase().includes(this.SearchedProblemTitle.toLowerCase())
      );
    } else {
      this.problems = this.loadedProblems;
    }
  }

  GroupProblems() {
    this.problems = this.loadedProblems;
    if (this.SearchedProblemDifficulty) {
      this.problems = this.problems.filter(problem => 
        this.getDifficultyText(problem.difficultyLevel) === this.SearchedProblemDifficulty
      );
    } else {
      this.problems = this.loadedProblems;
    }
  }

}
