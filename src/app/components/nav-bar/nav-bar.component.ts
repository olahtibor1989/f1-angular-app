import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  router = inject(Router);
  goToAddDriver() {
    this.router.navigate(['/add-driver']);
  }

  goToHome(){
    this.router.navigate(['/']);
  }
}
