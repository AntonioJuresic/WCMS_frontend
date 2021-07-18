import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesTestComponent } from './components/articles-test/articles-test.component';

const routes: Routes = [
    { path: "articles", component: ArticlesTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
