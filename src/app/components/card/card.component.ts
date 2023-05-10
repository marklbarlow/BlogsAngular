import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BlogPreview } from 'app/model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-card',
  styleUrls: ['./card.component.scss'],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input({ required: true }) public preview?: BlogPreview;
}
