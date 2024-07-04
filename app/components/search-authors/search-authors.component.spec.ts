import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAuthorsComponent } from './search-authors.component';

describe('SearchAuthorsComponent', () => {
  let component: SearchAuthorsComponent;
  let fixture: ComponentFixture<SearchAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAuthorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
