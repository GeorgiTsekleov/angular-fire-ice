import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCardMeta } from './content-card-meta';

describe('ContentCardMeta', () => {
  let component: ContentCardMeta;
  let fixture: ComponentFixture<ContentCardMeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCardMeta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCardMeta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
