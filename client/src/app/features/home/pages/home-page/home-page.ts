import { Component } from '@angular/core';
import { PrimaryButton } from '../../../../shared/components/buttons/primary-button/primary-button';
import { SecondaryButton } from '../../../../shared/components/buttons/secondary-button/secondary-button';

@Component({
  selector: 'app-home-page',
  imports: [PrimaryButton, SecondaryButton],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
