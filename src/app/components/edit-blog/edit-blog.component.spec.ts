import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { QuillEditorComponent } from 'ngx-quill';

import { EditBlogComponent } from './edit-blog.component';
import { EditBlogStore } from './edit-blog.store';

describe('EditBlogComponent', () => {
  let component: EditBlogComponent;
  let fixture: ComponentFixture<EditBlogComponent>;
  let store: jasmine.SpyObj<EditBlogStore>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('store', ['saveBlogEntry']);

    await TestBed.configureTestingModule({
      declarations: [EditBlogComponent],
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

  describe('onSave()', () => {
    it('save the blog entry', () => {
      const entry = 'This is the blog entry';
      const title = 'This is the title';
      component.editor.setValue(entry);
      component.title.setValue(title);

      component.onSave();

      expect(store.saveBlogEntry).toHaveBeenCalledWith(title, entry);
    });
  });
});
