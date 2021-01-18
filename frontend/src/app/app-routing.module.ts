import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualComponent } from './components/analytics/annual/annual.component';
import { MonthlyComponent } from './components/analytics/monthly/monthly.component';
import { SummaryComponent } from './components/analytics/summary/summary.component';
import { CreateComponent } from './components/data/create/create.component';
import { DetailsComponent } from './components/data/details/details.component';
import { EditComponent } from './components/data/edit/edit.component';
import { ListComponent } from './components/data/list/list.component';



const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'list', component: ListComponent },
  { path: 'details/:id', component: DetailsComponent},
  { path: 'summary', component: SummaryComponent},
  { path: 'analytics/:year', component: AnnualComponent},
  { path: 'analytics/:year/:month', component: MonthlyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
