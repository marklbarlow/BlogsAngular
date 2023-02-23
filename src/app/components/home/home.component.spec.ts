import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard } from '@angular/material/card';
import { MatNavList } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MockComponent } from 'ng-mocks';
import { previews } from 'testing';

import { HomeComponent } from './home.component';
import { HomeStore } from './home.store';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: jasmine.SpyObj<HomeStore>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('store', ['loadPreviews']);

    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockComponent(MatCard),
        MockComponent(MatNavList),
        MockComponent(MatProgressSpinner),
      ],
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

  describe('trackPreviews()', () => {
    it('returns the preview id', () => {
      const result = component.trackPreviews(0, previews[0]);
      expect(result).toBe(previews[0].id);
    });
  });
});
