import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Social } from '../models/app-session.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = '/api/v1';
  private readonly clientId = 'rgbexam';

  constructor(private http: HttpClient) {}

  async login(userName: string, otp: string): Promise<any> {
    const headers = new HttpHeaders({
      'CLIENT_ID': this.clientId,
      'Content-Type': 'application/json',
    });

    const data: any = await firstValueFrom(
      this.http.post(`${this.baseUrl}/login`, { userName, otp }, { headers })
    );

    if (data?.loginStatus === 'success') {
      return data;
    }
    throw new Error(data?.message ?? data?.error ?? 'Login failed');
  }

  async getSocials(): Promise<Social[]> {
    const headers = new HttpHeaders({ 'CLIENT_ID': this.clientId });

    const data: any = await firstValueFrom(
      this.http.get(`${this.baseUrl}/socials`, { headers })
    );

    if (Array.isArray(data)) return data;
    if (data?.data) return data.data;
    if (data?.socials) return data.socials;
    return [];
  }
}
