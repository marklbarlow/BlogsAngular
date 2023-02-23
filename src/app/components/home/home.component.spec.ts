import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatLegacyCard as MatCard } from '@angular/material/legacy-card';
import { MatLegacyNavList as MatNavList } from '@angular/material/legacy-list';
import { MatLegacyProgressSpinner as MatProgressSpinner } from '@angular/material/legacy-progress-spinner';
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
