import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MockComponent, MockDirective } from 'ng-mocks';
import { QuillEditorComponent } from 'ngx-quill';

import { EditBlogComponent } from './edit-blog.component';
import { EditBlogStore } from './edit-blog.store';

describe('EditBlogComponent', () => {
  let component: EditBlogComponent;
  let fixture: ComponentFixture<EditBlogComponent>;
  let store: jasmine.SpyObj<EditBlogStore>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('store', ['save']);

    await TestBed.configureTestingModule({
      declarations: [
        EditBlogComponent,
        MockDirective(MatLabel),
        MockComponent(MatFormField),
      ],
      imports: [MockComponent(QuillEditorComponent), ReactiveFormsModule],
    })
      .overrideComponent(EditBlogComponent, {
        set: {
          providers: [{ provide: EditBlogStore, useValue: store }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(EditBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
