import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { GroupsComponent } from './component/groups/groups.component';
import { ListFriendsComponent } from './component/list-friends/list-friends.component';
import { LoginComponent } from './component/login/login.component';
import { ChatUsersComponent } from './component/chat-users/chat-users.component';
import { GuardGuard } from './Services/guard.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'groups',
    component: GroupsComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'listUsuers',
    component: ListFriendsComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'chatUsers',
    component: ChatUsersComponent,
    canActivate: [GuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
