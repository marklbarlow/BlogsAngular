import { TestBed } from '@angular/core/testing';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        MockComponent(MatFormField),
        MockComponent(MatIcon),
        MockComponent(MatSelect),
        MockComponent(MatProgressSpinner),
        MockComponent(MatToolbar),
      ],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
