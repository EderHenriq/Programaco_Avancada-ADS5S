import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { Lista } from './lista/lista';
import { Gerenciar } from './gerenciar/gerenciar';

export const routes: Routes = [
  { path: 'cadastro', component: Cadastro },
  { path: 'lista', component: Lista },
  { path: 'gerenciar', component: Gerenciar },
  { path: '', redirectTo: '/cadastro', pathMatch: 'full' }
];
