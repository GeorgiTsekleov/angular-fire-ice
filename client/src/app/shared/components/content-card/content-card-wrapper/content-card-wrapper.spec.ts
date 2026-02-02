import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCardWrapper } from './content-card-wrapper';

describe('ContentCardWrapper', () => {
  let component: ContentCardWrapper;
  let fixture: ComponentFixture<ContentCardWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCardWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCardWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
