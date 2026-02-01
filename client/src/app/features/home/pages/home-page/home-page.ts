import { Component } from '@angular/core';
import { LandingCharacters } from '../../../../shared/components/landing/landing-characters/landing-characters';
import { LandingFeatures } from '../../../../shared/components/landing/landing-features/landing-features';
import { LandingSaga } from '../../../../shared/components/landing/landing-saga/landing-saga';
import { PrimaryButton } from '../../../../shared/components/buttons/primary-button/primary-button';
import { SecondaryButton } from '../../../../shared/components/buttons/secondary-button/secondary-button';

@Component({
  selector: 'app-home-page',
  imports: [LandingCharacters, LandingFeatures, LandingSaga, PrimaryButton, SecondaryButton],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
