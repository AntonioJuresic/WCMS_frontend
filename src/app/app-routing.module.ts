import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticlesTestComponent } from './components/articles-test/articles-test.component';

const routes: Routes = [
    { path: "articles", component: ArticlesTestComponent },
    { path: "p/:id", component : ArticleDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
