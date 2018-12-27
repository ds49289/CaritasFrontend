import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserInputComponent } from './user-input/user-input.component';
import { SidenavResponsiveExample } from './navigation/sidenav-responsive';
import { ServiceComponent } from './service/service.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  { path: 'usersInput', component: UserInputComponent},
  { path: 'users', component: UserGridComponent },
  { path: '',
    pathMatch: 'full',
    component: UserGridComponent
  },
  { path: "openService", component: UserUpdateComponent},
  // umjesto userupdatecomponent ide serviceComponent ovo je test
  { path: "userUpdate", component: UserUpdateComponent}
]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
