import { Routes } from '@angular/router';
import { NewClient } from './components/clients/new-client/new-client';
import { ListClients } from './components/clients/list-clients/list-clients';

export const routes: Routes = [
    {path:"new", component:NewClient},
    {path:"", component:ListClients},
];
