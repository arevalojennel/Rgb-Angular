import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Social } from '../models/app-session.model';

@Component({
  selector: 'app-social-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-detail.component.html',
  styleUrls: ['./social-detail.component.scss'],
})
export class SocialDetailComponent implements OnInit {
  social!: Social;
  isWebView = false;
  isLoading = false;
  safeUrl: SafeResourceUrl | null = null;
  imgError = false;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;
    if (state?.social) {
      this.social = state.social;
    }
  }

  ngOnInit(): void {
    if (!this.social) {
      this.router.navigate(['/dashboard']);
    }
  }

  get themeColor(): string {
    if (this.social?.color) {
      return `#${this.social.color.toString(16).padStart(6, '0')}`;
    }
    const name = this.social?.name?.toLowerCase();
    if (name === 'youtube') return '#FF0000';
    if (name === 'spotify') return '#1DB954';
    if (name === 'facebook') return '#1877F2';
    return '#888888';
  }

  goBack(): void {
    if (this.isWebView) {
      this.isWebView = false;
      this.safeUrl = null;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

 visitSite(): void {
  if (this.social?.webUrl) {
    window.open(this.social.webUrl, '_blank');
  }
}
  onIframeLoad(): void {
    this.isLoading = false;
  }
}
