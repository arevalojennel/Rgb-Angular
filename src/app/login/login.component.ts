import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChildren('pinBox') pinBoxes!: QueryList<ElementRef<HTMLInputElement>>;

  username = '';
  usernameError: string | null = null;
  hasAttempted = false;

  showPinModal = false;
  // pin stored as array of single chars
  pinChars: string[] = ['', '', '', '', '', ''];

  get pin(): string {
    return this.pinChars.join('');
  }

  get pinFilled(): boolean {
    return this.pinChars.every(c => c !== '');
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const err = this.route.snapshot.queryParamMap.get('error');
    if (err) {
      this.usernameError = err;
      this.hasAttempted = true;
    }
  }

  get isEnterEnabled(): boolean {
    return (
      this.username.length > 0 &&
      this.username.length <= 24 &&
      /^[a-zA-Z0-9]+$/.test(this.username)
    );
  }

  onUsernameInput(): void {
    if (this.hasAttempted) this.validate();
  }

  validate(): string | null {
    if (!this.username) {
      this.usernameError = 'please enter your username';
      return this.usernameError;
    }
    if (this.username.length > 24) {
      this.usernameError = 'Must not exceed 24 characters';
      return this.usernameError;
    }
    if (!/^[a-zA-Z0-9]+$/.test(this.username)) {
      this.usernameError = 'Values must be alphanumeric';
      return this.usernameError;
    }
    this.usernameError = null;
    return null;
  }

  onEnterPressed(): void {
    this.hasAttempted = true;
    if (this.validate()) return;
    this.pinChars = ['', '', '', '', '', ''];
    this.showPinModal = true;
    // Focus first box after modal renders
    setTimeout(() => {
      this.pinBoxes?.first?.nativeElement?.focus();
    }, 50);
  }

  onPinBoxInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, '').slice(-1); // digits only, last char
    this.pinChars[index] = val;
    input.value = val;

    if (val && index < 5) {
      // Move focus to next box
      const boxes = this.pinBoxes.toArray();
      boxes[index + 1]?.nativeElement?.focus();
    }
  }

  onPinKeydown(event: KeyboardEvent, index: number): void {
    const boxes = this.pinBoxes.toArray();
    if (event.key === 'Backspace') {
      if (this.pinChars[index]) {
        // Clear current
        this.pinChars[index] = '';
        (event.target as HTMLInputElement).value = '';
      } else if (index > 0) {
        // Move back and clear
        this.pinChars[index - 1] = '';
        const prev = boxes[index - 1].nativeElement;
        prev.value = '';
        prev.focus();
      }
      event.preventDefault();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      boxes[index - 1].nativeElement.focus();
    } else if (event.key === 'ArrowRight' && index < 5) {
      boxes[index + 1].nativeElement.focus();
    } else if (event.key === 'Enter' && this.pinFilled) {
      this.onPinEnter();
    }
  }

  onPinPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') ?? '';
    const digits = text.replace(/\D/g, '').slice(0, 6).split('');
    const boxes = this.pinBoxes.toArray();
    digits.forEach((d, i) => {
      this.pinChars[i] = d;
      boxes[i].nativeElement.value = d;
    });
    const nextEmpty = digits.length < 6 ? digits.length : 5;
    boxes[nextEmpty]?.nativeElement?.focus();
  }

  onPinEnter(): void {
    if (!this.pinFilled) return;
    this.showPinModal = false;
    this.router.navigate(['/loading'], {
      state: { username: this.username, pin: this.pin },
    });
  }

  closeModal(): void {
    this.showPinModal = false;
  }
}
