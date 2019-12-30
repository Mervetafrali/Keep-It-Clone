import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';
import { canActivate } from '@angular/fire/auth-guard';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['login']);

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'forget', loadChildren: './forget/forget.module#ForgetPageModule' },
  { path: 'notes', loadChildren: './notes/notes.module#NotesPageModule', canActivate: [AuthGuard], },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'tags', loadChildren: './module-160202098/tags/tags.module#TagsPageModule', canActivate: [AuthGuard], },
  { path: 'archive', loadChildren: './archive/archive.module#ArchivePageModule', canActivate: [AuthGuard], },
  { path: 'reminders', loadChildren: './reminders/reminders.module#RemindersPageModule' , canActivate: [AuthGuard], },
  { path: 'todo', loadChildren: './module-160202021/todo/todo.module#TodoPageModule' , canActivate: [AuthGuard],},
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard],
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
  },  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' }












];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
