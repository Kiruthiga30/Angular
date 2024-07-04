import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BooksComponent } from './components/books/books.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { ResultsComponent } from './components/results/results.component';
import { ListAuthorsComponent } from './components/list-authors/list-authors.component';
import { ListBooksComponent } from './components/list-books/list-books.component';
import { SearchBooksComponent } from './components/search-books/search-books.component';
import { SearchAuthorsComponent } from './components/search-authors/search-authors.component';

export const routes: Routes = [
    {
        path: "register", component: RegisterComponent
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "home", component: HomeComponent
    },
    {
        path: "book", component: BooksComponent, canActivate: [AuthGuard]
    },
    {
        path: "author", component: AuthorsComponent, canActivate: [AuthGuard]
    },
    {
        path: "result", component: ResultComponent
    },
    {
        path: "results", component: ResultsComponent
    },
    {
        path: "allAuthors", component: ListAuthorsComponent
    },
    {
        path: "allBooks", component: ListBooksComponent
    },
    {
        path: "searchBook", component: SearchBooksComponent
    },
    {
        path: "searchAuthor", component: SearchAuthorsComponent
    },
    {
        path: "", redirectTo: "/login", pathMatch: "full"
    },
];
