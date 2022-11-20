import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  EditBlogComponent,
  HomeComponent,
  PageNotFoundComponent,
  ViewBlogComponent,
} from './components';

const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  {
    path: 'view-blog/:id',
    title: 'View Blog Entry',
    component: ViewBlogComponent,
  },
  {
    path: 'edit-blog',
    title: 'Entry Blog Entry',
    component: EditBlogComponent,
  },
  { path: '**', title: 'Page Not Found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
