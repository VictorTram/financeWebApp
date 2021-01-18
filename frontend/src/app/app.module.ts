import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnualComponent } from './components/analytics/annual/annual.component';
import { MonthlyComponent } from './components/analytics/monthly/monthly.component';
import { SummaryComponent } from './components/analytics/summary/summary.component';
import { CreateComponent } from './components/data/create/create.component';
import { DetailsComponent } from './components/data/details/details.component';
import { EditComponent } from './components/data/edit/edit.component';
import { ListComponent } from './components/data/list/list.component';
import { ListAnnualComponent } from './components/data/list-annual/list-annual.component';
import { ListMonthlyComponent } from './components/data/list-monthly/list-monthly.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    DetailsComponent,
    SummaryComponent,
    AnnualComponent,
    MonthlyComponent,
    ListAnnualComponent,
    ListMonthlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
