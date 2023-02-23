import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  EditBlogComponent,
  HomeComponent,
  PageNotFoundComponent,
  ViewBlogComponent,
} from './components';

const routes: Routes = [
  { path: '', title: 'Blog - Home', component: HomeComponent },
  {
    path: 'view-blog/:id',
    title: 'Blog - View Blog Entry',
    component: ViewBlogComponent,
  },
  {
    path: 'edit-blog',
    title: 'Blog - Edit Blog Entry',
    component: EditBlogComponent,
  },
  { path: '**', title: 'Blog - Page Not Found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
