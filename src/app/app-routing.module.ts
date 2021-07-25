import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './components/administration-components/administration/administration.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { StylingComponent } from './styling/styling.component';

const routes: Routes = [
    { path: "", component: MainPageComponent },
    { path: "p/:id", component: PostDetailComponent },

    { path: "login", component: LoginComponent },
    { path: "administration", component: AdministrationComponent },

    { path: "styling", component: StylingComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
