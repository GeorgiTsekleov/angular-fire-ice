import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail {
  private route = inject(ActivatedRoute);

  protected readonly bookId = this.route.snapshot.paramMap.get('id') || '';
}
