import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const toastrService = {
  success: (
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>
  ) => { },
  error: (
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>
  ) => { },
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, ToastrModule.forRoot(), BrowserAnimationsModule],
      providers: [HttpClient, HttpHandler, { provide: ToastrService, useValue: toastrService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
