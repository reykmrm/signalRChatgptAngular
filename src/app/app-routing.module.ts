import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { GroupsComponent } from './component/groups/groups.component';
import { ListFriendsComponent } from './component/list-friends/list-friends.component';
import { LoginComponent } from './component/login/login.component';
import { ChatUsersComponent } from './component/chat-users/chat-users.component';

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
  },
  {
    path: 'groups',
    component: GroupsComponent,
  },
  {
    path: 'listUsuers',
    component: ListFriendsComponent,
  },
  {
    path: 'chatUsers',
    component: ChatUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
