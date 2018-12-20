import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SidenavResponsiveExample } from './navigation/sidenav-responsive';
import { MyCustomMaterialModuleModule } from './custom-material-module/my-custom-material-module.module';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserService } from './services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserInputComponent } from './user-input/user-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSearchComponent } from './user-search/user-search.component';
import { AppRoutingModule } from './/app-routing.module';
import { AppDateAdapter, APP_DATE_FORMATS } from './app-date-adapter';
import { DropdownService } from './services/dropdown.service';

@NgModule({
  declarations: [
    AppComponent,
    SidenavResponsiveExample,
    DataTableComponent,
    UserGridComponent,
    UserInputComponent,
    UserSearchComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MyCustomMaterialModuleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter},
{
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
