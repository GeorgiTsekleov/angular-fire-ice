import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetailsCard } from './content-details-card';

describe('ContentDetailsCard', () => {
  let component: ContentDetailsCard;
  let fixture: ComponentFixture<ContentDetailsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentDetailsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentDetailsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
