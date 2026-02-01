import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionTitle } from '../../section-title/section-title/section-title';

@Component({
  selector: 'app-landing-characters',
  imports: [RouterLink, SectionTitle],
  templateUrl: './landing-characters.html',
  styleUrl: './landing-characters.scss',
})
export class LandingCharacters {}
