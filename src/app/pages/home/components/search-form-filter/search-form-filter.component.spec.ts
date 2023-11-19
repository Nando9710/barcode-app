import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormFilterComponent } from './search-form-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchFormFilterComponent', () => {
  let component: SearchFormFilterComponent;
  let fixture: ComponentFixture<SearchFormFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFormFilterComponent, BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchFormFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
