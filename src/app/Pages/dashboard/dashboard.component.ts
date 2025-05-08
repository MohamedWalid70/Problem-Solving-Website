import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguagesService } from '../../services/languages.service';
import { Language } from '../../Interfaces/Language';
import { ProblemsApiService } from '../../services/problems-api.service';
// import { NavbarComponent } from '../../Components/navbar/navbar.component';


import {
  ProblemAPI,
  getDifficultyText,
  getDifficultyLevel,
} from '../../Interfaces/ProblemAPI';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Language management
  languages: Language[] = [];
  newLanguageName: string = '';
  editingLanguage: Language | null = null;
  isLanguagesLoading: boolean = false;

  // Problem management
  problems: ProblemAPI[] = [];
  newProblem: ProblemAPI = this.createEmptyProblem();
  editingProblem: ProblemAPI | null = null;
  isProblemsLoading: boolean = false;
  difficultyLevels = [
    { value: 1, text: 'Easy' },
    { value: 2, text: 'Medium' },
    { value: 3, text: 'Hard' },
  ];

  // For showing notifications
  notification = {
    message: '',
    type: '',
    visible: false,
  };

  constructor(
    private languagesService: LanguagesService,
    private problemsService: ProblemsApiService
  ) {}

  ngOnInit() {
    // Load languages when component initializes
    this.loadLanguages();
    // Load problems when component initializes
    this.loadProblems();
  }

  // Function to create an empty problem object
  createEmptyProblem(): ProblemAPI {
    return {
      title: '',
      description: '',
      constraints: '',
      difficultyLevel: 1,
      testCaseInput: '',
      testCaseOutput: '',
      best_Solution: '',
    };
  }

  // LANGUAGE MANAGEMENT FUNCTIONS

  // Function to load languages from API
  loadLanguages() {
    this.isLanguagesLoading = true;

    this.languagesService.getLanguages().subscribe({
      next: (data) => {
        // Update languages array with data from API
        this.languages = data || [];
        this.isLanguagesLoading = false;
      },
      error: (error) => {
        console.error('Error loading languages', error);
        this.isLanguagesLoading = false;
        this.showNotification('Failed to load languages', 'error');
      },
    });
  }

  // Function to add a new language
  addLanguage() {
    // Validate input
    if (!this.newLanguageName.trim()) {
      this.showNotification('Please enter a language name', 'error');
      return;
    }

    // Prepare language object
    const languageToAdd = { name: this.newLanguageName.trim() };

    // Call API to add language
    this.languagesService.addLanguage(languageToAdd).subscribe({
      next: (newLanguage) => {
        // Reload languages to ensure we have the latest data
        this.loadLanguages();

        // Clear input field and show success message
        this.newLanguageName = '';
        this.showNotification('Language added successfully!', 'success');
      },
      error: (error) => {
        console.error('Error adding language', error);
        this.showNotification('Failed to add language', 'error');
      },
    });
  }

  // Function to start editing a language
  startEditing(language: Language) {
    // Create a copy of the language to avoid modifying the original directly
    this.editingLanguage = { ...language };
  }

  // Function to cancel editing
  cancelEditing() {
    this.editingLanguage = null;
  }

  // Function to update a language
  updateLanguage() {
    // Validate input
    if (!this.editingLanguage || !this.editingLanguage.name.trim()) {
      this.showNotification('Language name cannot be empty', 'error');
      return;
    }

    const updatedName = { name: this.editingLanguage.name.trim() };

    // Call API to update language
    this.languagesService
      .updateLanguage(this.editingLanguage.languagesId, updatedName)
      .subscribe({
        next: (response) => {
          // Reload languages to ensure we have the latest data
          this.loadLanguages();

          // Clear editing state and show success message
          this.editingLanguage = null;
          this.showNotification('Language updated successfully!', 'success');
        },
        error: (error) => {
          console.error('Error updating language', error);
          this.showNotification('Failed to update language', 'error');
        },
      });
  }

  // Function to delete a language
  deleteLanguage(id: number) {
    if (confirm('Are you sure you want to delete this language?')) {
      // Call API to delete language
      this.languagesService.deleteLanguage(id).subscribe({
        next: () => {
          // Reload languages to ensure we have the latest data
          this.loadLanguages();

          // Show success message
          this.showNotification('Language deleted successfully!', 'success');
        },
        error: (error) => {
          console.error('Error deleting language', error);
          this.showNotification('Failed to delete language', 'error');
        },
      });
    }
  }

  // PROBLEM MANAGEMENT FUNCTIONS

  // Function to load problems from API
  loadProblems() {
    this.isProblemsLoading = true;

    this.problemsService.getProblems().subscribe({
      next: (data) => {
        this.problems = data || [];
        this.isProblemsLoading = false;
      },
      error: (error) => {
        console.error('Error loading problems', error);
        this.isProblemsLoading = false;
        this.showNotification('Failed to load problems', 'error');
      },
    });
  }

  // Function to add a new problem
  addProblem() {
    // Validate input
    if (!this.newProblem.title.trim() || !this.newProblem.description.trim()) {
      this.showNotification('Title and description are required', 'error');
      return;
    }

    // Make sure all string fields are properly trimmed
    const problemToAdd: ProblemAPI = {
      title: this.newProblem.title.trim(),
      description: this.newProblem.description.trim(),
      constraints: this.newProblem.constraints.trim(),
      difficultyLevel: Number(this.newProblem.difficultyLevel), // Ensure it's a number
      testCaseInput: this.newProblem.testCaseInput.trim(),
      testCaseOutput: this.newProblem.testCaseOutput.trim(),
      best_Solution: this.newProblem.best_Solution.trim(),
    };

    // Log the data being sent for debugging
    console.log('Sending problem data:', problemToAdd);

    // Call API to add problem
    this.problemsService.addProblem(problemToAdd).subscribe({
      next: (newProblem) => {
        // Reload problems to ensure we have the latest data
        this.loadProblems();

        // Reset form and show success message
        this.newProblem = this.createEmptyProblem();
        this.showNotification('Problem added successfully!', 'success');
      },
      error: (error) => {
        console.error('Error adding problem', error);

        // More detailed error message
        let errorMessage = 'Failed to add problem';
        if (error.error && error.error.errors) {
          const errors = error.error.errors;
          const errorDetails = Object.keys(errors)
            .map((key) => `${key}: ${errors[key]}`)
            .join(', ');
          errorMessage += `: ${errorDetails}`;
        }

        this.showNotification(errorMessage, 'error');
      },
    });
  }

  // Function to start editing a problem
  startEditingProblem(problem: ProblemAPI) {
    // Create a copy of the problem to avoid modifying the original directly
    this.editingProblem = { ...problem };
  }

  // Function to cancel editing a problem
  cancelEditingProblem() {
    this.editingProblem = null;
  }

  // Function to update a problem
  updateProblem() {
    // Validate input
    if (
      !this.editingProblem ||
      !this.editingProblem.title.trim() ||
      !this.editingProblem.description.trim()
    ) {
      this.showNotification('Title and description are required', 'error');
      return;
    }

    const id = this.editingProblem.id;
    if (!id) {
      this.showNotification('Invalid problem ID', 'error');
      return;
    }

    // Make sure all string fields are properly trimmed
    const problemToUpdate: ProblemAPI = {
      id: id,
      title: this.editingProblem.title.trim(),
      description: this.editingProblem.description.trim(),
      constraints: this.editingProblem.constraints.trim(),
      difficultyLevel: Number(this.editingProblem.difficultyLevel), // Ensure it's a number
      testCaseInput: this.editingProblem.testCaseInput.trim(),
      testCaseOutput: this.editingProblem.testCaseOutput.trim(),
      best_Solution: this.editingProblem.best_Solution.trim(),
    };

    console.log('Updating problem data:', problemToUpdate);

    // Call API to update problem
    this.problemsService.updateProblem(id, problemToUpdate).subscribe({
      next: (response) => {
        // Reload problems to ensure we have the latest data
        this.loadProblems();

        // Clear editing state and show success message
        this.editingProblem = null;
        this.showNotification('Problem updated successfully!', 'success');
      },
      error: (error) => {
        console.error('Error updating problem', error);

        // More detailed error message
        let errorMessage = 'Failed to update problem';
        if (error.error && error.error.errors) {
          const errors = error.error.errors;
          const errorDetails = Object.keys(errors)
            .map((key) => `${key}: ${errors[key]}`)
            .join(', ');
          errorMessage += `: ${errorDetails}`;
        }

        this.showNotification(errorMessage, 'error');
      },
    });
  }

  // Function to delete a problem
  deleteProblem(id: number) {
    if (confirm('Are you sure you want to delete this problem?')) {
      // Call API to delete problem
      this.problemsService.deleteProblem(id).subscribe({
        next: () => {
          // Reload problems to ensure we have the latest data
          this.loadProblems();

          // Show success message
          this.showNotification('Problem deleted successfully!', 'success');
        },
        error: (error) => {
          console.error('Error deleting problem', error);
          this.showNotification('Failed to delete problem', 'error');
        },
      });
    }
  }

  // Utility function to get difficulty text
  getDifficultyText(level: number): string {
    return getDifficultyText(level);
  }

  // Function to show notifications
  showNotification(message: string, type: string) {
    this.notification = {
      message,
      type,
      visible: true,
    };

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      this.notification.visible = false;
    }, 3000);
  }
}
