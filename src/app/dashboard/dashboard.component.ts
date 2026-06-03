import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppSessionService } from '../services/app-session.service';
import { Social } from '../models/app-session.model';

const DEFAULT_SOCIALS: Social[] = [
  {
    name: 'YouTube',
    history: `YouTube is an American online video-sharing platform headquartered in San Bruno, California, founded by three former PayPal employees—Chad Hurley, Steve Chen, and Jawed Karim—in February 2005. Google bought the site in November 2006 for US$1.65 billion, since which it operates as one of Google's subsidiaries.\n\nYouTube allows users to upload videos, view them, rate them with likes and dislikes, share them, add videos to playlists, report, make comments on videos, and subscribe to other users. The slogan Broadcast Yourself used for several years and the reference to user profiles as Channels signifies the premise upon which the platform is based, of allowing anyone to operate a personal broadcasting station in resemblance to television with the extension of video on demand.\n\nAs such, the platform offers a wide variety of user-generated and corporate media videos. Available content includes video clips, TV show clips, music videos, short and documentary films, audio recordings, movie trailers, live streams, and other content such as video blogging, short original videos, and educational videos.`,
    iconUrl: 'https://indexcodex.com/api/v1/assets/youtube_icon.png',
    imgUrl: 'https://indexcodex.com/api/v1/assets/youtube.png',
    webUrl: 'https://youtube.com/',
  },
  {
    name: 'Spotify',
    history: 'Spotify offers digital copyright restricted recorded audio content, including more than 100 million songs and six million podcast titles, from record labels and media companies. Users can search for music based on artist, album, or genre, and can create, edit, and share playlists.',
    iconUrl: 'https://indexcodex.com/api/v1/assets/spotify_icon.png',
    imgUrl: 'https://indexcodex.com/api/v1/assets/spotify.png',
    webUrl: 'https://spotify.com/',
  },
  {
    name: 'Facebook',
    history: 'Facebook is a social media and social networking service owned by the American technology conglomerate Meta. Its name derives from the face book directories often given to American university students.',
    iconUrl: 'https://indexcodex.com/api/v1/assets/facebook_icon.png',
    imgUrl: 'https://indexcodex.com/api/v1/assets/facebook.png',
    webUrl: 'https://facebook.com/',
  },
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  socials: Social[] = [];
  showLogoutSheet = false;

  readonly socialAssets = [
    'assets/images/youtube.png',
    'assets/images/spotify.png',
    'assets/images/facebook.png',
  ];

  constructor(public session: AppSessionService, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;
    if (state?.socials?.length) {
      this.socials = state.socials;
    }
  }

  ngOnInit(): void {
    if (!this.socials.length) {
      this.socials = DEFAULT_SOCIALS;
    }
  }

  getSocial(index: number): Social {
    return this.socials[index] ?? DEFAULT_SOCIALS[index];
  }

  openDetail(index: number): void {
    this.router.navigate(['/social-detail'], {
      state: { social: this.getSocial(index) },
    });
  }

  openOthers(): void {
    this.router.navigate(['/others']);
  }

  logout(): void {
    this.showLogoutSheet = false;
    this.router.navigate(['/loading'], { state: { isLoggingOut: true } });
  }
}
