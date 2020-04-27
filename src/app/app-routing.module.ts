import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactFormComponent } from './contact-form/contact-form.component';


const routes: Routes = [

  {path: '',   redirectTo: '/', pathMatch: 'full'},
  {path: '', component: DashboardComponent},
  {path: 'contact', component: ContactFormComponent},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
