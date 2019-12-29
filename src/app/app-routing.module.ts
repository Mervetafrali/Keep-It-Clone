import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'forget', loadChildren: './forget/forget.module#ForgetPageModule' },
  { path: 'notes', loadChildren: './notes/notes.module#NotesPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'tags', loadChildren: './module-160202098/tags/tags.module#TagsPageModule' },
  { path: 'archive', loadChildren: './archive/archive.module#ArchivePageModule' },
  { path: 'reminders', loadChildren: './reminders/reminders.module#RemindersPageModule' },
  { path: 'todo', loadChildren: './module-160202021/todo/todo.module#TodoPageModule'},
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'portal',
    loadChildren: './portal/portal.module#PortalModule'
  },
  {
    path: 'player',
    loadChildren: './player/player.module#PlayerModule'
  }











];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
