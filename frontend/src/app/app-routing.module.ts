import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './components/analytics/summary/summary.component';
import { CreateComponent } from './components/data/create/create.component';
import { EditComponent } from './components/data/edit/edit.component';
import { ListComponent } from './components/data/list/list.component';


const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'list', component: ListComponent },
  { path: 'summary', component: SummaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
