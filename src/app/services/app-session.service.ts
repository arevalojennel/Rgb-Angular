import { Injectable } from '@angular/core';
import { UserData } from '../models/app-session.model';

@Injectable({ providedIn: 'root' })
export class AppSessionService {
  username: string | null = null;
  userId: string | null = null;
  profilePicture: string | null = null;
  userData: UserData | null = null;

  setUser(opts: {
    username: string;
    userId?: string;
    profilePicture?: string;
    userData?: UserData;
  }): void {
    this.username = opts.username;
    this.userId = opts.userId ?? null;
    this.profilePicture = opts.profilePicture ?? null;
    this.userData = opts.userData ?? null;
  }

  clear(): void {
    this.username = null;
    this.userId = null;
    this.profilePicture = null;
    this.userData = null;
  }
}
