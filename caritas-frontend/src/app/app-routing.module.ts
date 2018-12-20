import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserInputComponent } from './user-input/user-input.component';
import { SidenavResponsiveExample } from './navigation/sidenav-responsive';

const routes: Routes = [
  { path: 'usersInput', component: UserInputComponent},
  { path: 'users', component: UserGridComponent },
  { path: '',
    pathMatch: 'full',
    component: UserGridComponent
  }
]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }