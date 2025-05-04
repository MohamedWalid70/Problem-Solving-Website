import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginEnableService } from '../../services/LoginEnable/login-enable.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username : string | null = '';
  loginEnabled = false;
  constructor(private loginEnableService: LoginEnableService) {}

  ngOnInit() {
    this.loginEnableService.getLoginEnabled().subscribe((enabled) => {
      this.loginEnabled = enabled;
      if(this.loginEnabled) {
        this.username = localStorage.getItem('username');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    this.loginEnableService.setLoginEnabled(false);
    this.loginEnabled = false;
  }
}
