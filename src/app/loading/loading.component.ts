import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AppSessionService } from '../services/app-session.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  statusText = 'Logging In';
  showError = false;
  errorMessage = '';

  private username = '';
  private pin = '';
  private isLoggingOut = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private session: AppSessionService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;
    if (state) {
      this.username = state.username ?? '';
      this.pin = state.pin ?? '';
      this.isLoggingOut = state.isLoggingOut ?? false;
    }
  }

  ngOnInit(): void {
    if (this.isLoggingOut) {
      this.statusText = 'Logging Out';
      this.performLogout();
    } else {
      this.performLogin();
    }
  }

  async performLogin(): Promise<void> {
    try {
      const data = await this.api.login(this.username, this.pin);
      this.statusText = 'Fetching Data';

      this.session.setUser({
        username: this.username,
        userId: data.userId?.toString(),
        profilePicture: data.profilePicture,
        userData: data,
      });

      const socials = await this.api.getSocials();
      this.router.navigate(['/dashboard'], { state: { socials } });
    } catch (e: any) {
      const msg = (e.message ?? 'Login failed').replace(/^Exception: /, '');
      this.errorMessage = msg;
      this.showError = true;
    }
  }

  async performLogout(): Promise<void> {
    await new Promise((res) => setTimeout(res, 3000));
    this.session.clear();
    this.router.navigate(['/login']);
  }

  closeErrorAndGoBack(): void {
    this.showError = false;
    this.router.navigate(['/login']);
  }
}
