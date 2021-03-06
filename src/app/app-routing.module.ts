import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './components/administration-components/administration/administration.component';
import { EditorPostComponent } from './components/editor-components/editor-post/editor-post.component';
import { LoginComponent } from './components/users-components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/error-components/not-found/not-found.component';
import { PostDetailComponent } from './components/posts-components/post-detail/post-detail.component';
import { RegistrationComponent } from './components/users-components/registration/registration.component';
import { ServerDownComponent } from './components/error-components/server-down/server-down.component';
import { StylingComponent } from './styling/styling.component';
import { PostsByCategoryComponent } from './components/posts-components/posts-by-category/posts-by-category.component';
import { EditorUserComponent } from './components/editor-components/editor-user/editor-user.component';
import { UserProfileComponent } from './components/users-components/user-profile/user-profile.component';
import { EditorUserAuthorityComponent } from './components/editor-components/editor-user-authority/editor-user-authority.component';
import { PasswordForgotComponent } from './components/users-components/password-forgot/password-forgot.component';

const routes: Routes = [
    { path: "", component: MainPageComponent },

    { path: "login", component: LoginComponent },
    { path: "registration", component: RegistrationComponent },
    { path: "forgotpassword", component: PasswordForgotComponent },

    { path: "u/editor", component: EditorUserComponent },
    { path: "u/authority", component: EditorUserAuthorityComponent},
    { path: "u/:username", component: UserProfileComponent },

    { path: "c/:name", component: PostsByCategoryComponent },

    { path: "p/editor", component: EditorPostComponent },
    { path: "p/editor/:id", component: EditorPostComponent },
    { path: "p/:id", component: PostDetailComponent },

    { path: "administration", component: AdministrationComponent },
    { path: "styling", component: StylingComponent },

    { path: "serverdown", component: ServerDownComponent },

    { path: "404", component: NotFoundComponent },
    { path: "**", redirectTo: "/404" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
