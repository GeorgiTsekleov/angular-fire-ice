import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { AppFacade } from './core/services/app.facade';
import { HeaderComponent } from './shared/components/header/header/header';
import { FooterComponent } from './shared/components/footer/footer/footer';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

const HOME_PAGE_URL = '/';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly appFacade = inject(AppFacade);
  protected readonly title = this.appFacade.title;
  private readonly router = inject(Router);
  protected readonly isHomePage = signal<boolean>(false);

  constructor() {
    this.isHomePage.set(this.router.url === HOME_PAGE_URL);
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.isHomePage.set(this.router.url === HOME_PAGE_URL);
      });
  }
}
