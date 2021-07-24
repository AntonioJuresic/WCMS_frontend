import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
    { path: "", component: PostsComponent },
    { path: "p/:id", component: PostDetailComponent },
    { path: "login", component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
