import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  isSlideOut = true;
  isSlideOutClose = false;
  constructor(private router: Router) {

  }

  // Side-navbar functionality...

  toggleSlideOut(): void {
    this.isSlideOut = !this.isSlideOut;
    this.isSlideOutClose = !this.isSlideOutClose;
  }

  // Redirection Links...

  onDash() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
  onProfile() {
    this.router.navigate(['/budget-planner/profile']);
  }

  onHistory() {
    this.router.navigate(['/budget-planner/history']);
  }

  onLogout() {
    this.router.navigate(['/budget-planner/login']);
  }
}
