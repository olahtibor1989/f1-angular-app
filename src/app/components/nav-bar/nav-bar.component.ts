import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  goToAddDriver() {
    this.router.navigate(['/add-driver']);
  }

  goToCircuits() {
    this.router.navigate(['/circuits']);
  }
}
