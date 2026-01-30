import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SearchBarComponent } from './search-bar';
import { provideMockBooksFacade } from '../../../../core/testing';

describe('SearchBar', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
      providers: [provideRouter([]), provideMockBooksFacade()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
