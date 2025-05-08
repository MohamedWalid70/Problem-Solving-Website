import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemsService } from '../../services/ProblemsService/problems.service';
import { SubmissionResponse } from '../../Interfaces/SubmissionResponse';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {
  submissions: SubmissionResponse[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private problemsService: ProblemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubmissions();
  }

  loadSubmissions(): void {
    this.loading = true;
    this.error = null;

    this.problemsService.getUserSubmissions().subscribe({
      next: (data) => {
        for (let submission of data) {
          this.submissions.push({
            Id: submission?.sId,
            Date: submission?.submissionTime.toString(),
            SubmissionStatus: submission?.isSuccessful == true ? "Accepted" : "Wrong Answer",
            ProblemId: submission?.problemId,
            ProblemTitle: submission?.problemTitle,
            SubmissionLanguage: submission?.language,
            SuccessRate: submission?.successRate*10,
            AiFeedback: submission?.aiEvaluation?.feedback
          });
        }
        console.log(data);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load submissions. Please try again later.';
        this.loading = false;
        console.error('Error loading submissions:', err);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-success';
      case 'wrong answer':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  viewProblem(problemId: number): void {
    this.router.navigate(['/problem-editor', problemId]);
  }
} 