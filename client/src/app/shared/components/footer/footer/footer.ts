import { Component } from '@angular/core';
import { LucideAngularModule, LucideIconData, Github, Linkedin, Twitter } from 'lucide-angular';
export interface FooterLink {
  label: string;
  routerLink: string;
}

export interface SocialLink {
  href: string;
  ariaLabel: string;
  icon: LucideIconData;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  readonly appName = 'Ice & Fire';
  readonly tagline = 'Explore the world of Westeros and beyond';
  readonly copyrightYear = new Date().getFullYear();

  readonly socialLinks: SocialLink[] = [
    { href: 'https://github.com', ariaLabel: 'GitHub', icon: Github },
    { href: 'https://twitter.com', ariaLabel: 'Twitter', icon: Twitter },
    { href: 'https://linkedin.com', ariaLabel: 'LinkedIn', icon: Linkedin },
  ];
}
