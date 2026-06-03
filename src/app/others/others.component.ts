import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

interface Brand {
  name: string;
  url: string;
  logo: string;
}

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss'],
})
export class OthersComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  autoplayInterval: any;

  readonly brands: Brand[] = [
    { name: 'Samsung', url: 'https://www.samsung.com/ph/', logo: 'assets/images/samsung.png' },
    { name: 'Apple', url: 'https://apple.com', logo: 'assets/images/apple.png' },
    { name: 'Windows', url: 'https://www.microsoft.com', logo: 'assets/images/windows.png' },
  ];

  constructor(
  private router: Router,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.startAutoplay();
  }

  get currentBrand(): Brand {
    return this.brands[this.currentIndex];
  }

  goTo(index: number): void {
    this.currentIndex = (index + this.brands.length) % this.brands.length;
  }

  startAutoplay(): void {
    this.stopAutoplay();

    this.autoplayInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.brands.length;
      this.cdr.markForCheck(); // or detectChanges()
    }, 3000);
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  visitBrand(): void {
    window.open(this.currentBrand.url, '_blank');
  }

  goBack(): void {
    this.stopAutoplay();
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }
}