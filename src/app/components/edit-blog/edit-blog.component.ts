import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EditBlogStore } from './edit-blog.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditBlogStore],
  selector: 'app-edit-blog',
  styleUrls: ['./edit-blog.component.scss'],
  templateUrl: './edit-blog.component.html',
})
export class EditBlogComponent {
  public formGroup: FormGroup;
  public editor = new FormControl<string>('', Validators.required);
  public title = new FormControl<string>('', Validators.required);

  constructor(private store: EditBlogStore) {
    this.formGroup = new FormGroup({
      editor: this.editor,
      title: this.title,
    });
  }

  public onSave(): void {
    this.store.saveBlogEntry(this.title.value!, this.editor.value!);
  }
}
