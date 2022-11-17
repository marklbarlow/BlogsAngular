import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from 'app/services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
})
export class EditBlogComponent {
  public formGroup: FormGroup;
  public editor = new FormControl<string>('', Validators.required);
  public title = new FormControl<string>('', Validators.required);

  constructor(private service: BlogsService) {
    this.formGroup = new FormGroup({
      editor: this.editor,
      title: this.title,
    });
  }

  public onSave(): void {
    this.service.saveBlogEntry(this.title.value!, this.editor.value!, 1);
  }
}
