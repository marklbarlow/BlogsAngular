import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatNavList } from '@angular/material/list';
import { MockComponent } from 'ng-mocks';

import { HomeComponent } from './home.component';
import { HomeStore } from './home.store';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: jasmine.SpyObj<HomeStore>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('store', ['loadPreviews']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MockComponent(MatNavList)],
    })
      .overrideComponent(HomeComponent, {
        set: {
          providers: [{ provide: HomeStore, useValue: store }],
        },
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
