import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'tickets',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/tickets/tickets.module').then((m) => m.TicketsModule)
      }
    ]
  },
  {
    path:'ticket',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/ticket/ticket.module').then((m) => m.TicketModule)
      }
    ]
  },
  {
    path:'',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/tickets/tickets.module').then((m) => m.TicketsModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
