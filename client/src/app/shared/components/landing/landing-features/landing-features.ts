import { Component } from '@angular/core';
import type { LucideIconData } from 'lucide-angular';
import { LucideAngularModule, Users, Shield, ScrollText, BookOpen } from 'lucide-angular';

export interface LandingFeature {
  heading: string;
  text: string;
  icon: LucideIconData;
}

@Component({
  selector: 'app-landing-features',
  imports: [LucideAngularModule],
  templateUrl: './landing-features.html',
  styleUrl: './landing-features.scss',
})
export class LandingFeatures {
  readonly features: LandingFeature[] = [
    {
      heading: 'Characters',
      text: 'Save the characters and books that matter most to you. Build your own collection as you explore the saga.',
      icon: Users,
    },
    {
      heading: 'Heroes',
      text: 'Discover heroes, villains, and legendary figures from across the Seven Kingdoms. Learn their allegiances, journeys, and how their stories intertwine.',
      icon: Shield,
    },
    {
      heading: 'History',
      text: 'Uncover the history, houses, and mysteries of Westeros. From ancient wars to noble lineages, the lore runs deep.',
      icon: ScrollText,
    },
    {
      heading: 'Lore',
      text: 'Explore all published novels from A Song of Ice and Fire. See characters, chapters, and key events connected to each book.',
      icon: BookOpen,
    },
  ];
}
