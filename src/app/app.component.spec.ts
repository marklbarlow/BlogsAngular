import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';
import { users } from 'testing';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components';
import { UserActions } from './store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [AppComponent, MockComponent(NavBarComponent)],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('dispatches an action when user is selected', () => {
      const store = TestBed.inject(Store) as MockStore;
      spyOn(store, 'dispatch');
      const expectedAction = UserActions.selectUser({ user: users[0] });

      component.onUserSelected(users[0]);

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
