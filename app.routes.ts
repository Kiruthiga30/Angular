import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/books/books.component';
import { AuthorComponent } from './components/authors/authors.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: "register", component: RegisterComponent
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "home", component: HomeComponent, canActivate: [AuthGuard],
    },
    {
        path: "book", component: BookComponent, canActivate: [AuthGuard],
    },
    {
        path: "author", component: AuthorComponent, canActivate: [AuthGuard],
    },
    {
        path: "", redirectTo: "/register", pathMatch: "full"
    },
    { path: '**', redirectTo: '/login' }
];
