import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlogPreview } from 'app/model';

import { HomeStore } from './home.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public previews$ = this.store.previews$;

  constructor(private store: HomeStore) {}

  public ngOnInit(): void {
    this.store.loadPreviews();
  }

  public trackPreviews(_: number, preview: BlogPreview): number {
    return preview.id;
  }
}
