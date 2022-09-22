import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { User } from './models/user';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  {path: "form", component: UserFormComponent},
  {path: "form/:id", component: UserFormComponent},
  {path: "list", component: UserListComponent},
  {path: "", redirectTo: "list", pathMatch: "full"},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
