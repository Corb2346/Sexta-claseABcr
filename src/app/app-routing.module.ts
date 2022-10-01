import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetCharactersResolver } from './libs/resolvers/get-characters.resolver';
import { NotFoundComponent } from './modules/uno/components/not-found/not-found/not-found.component';

const routes: Routes = [
  {
    path : '',
    resolve: {
      personaje: GetCharactersResolver //nombre de la key dado para uso de resolver //influye en hijos y solo cuando inicia la applicacion
     },

    children: [{
      path:'',
      redirectTo:'characters',
      pathMatch:'full'
    },
    {
      path: 'characters',
      loadChildren: () => import('./modules/uno/uno.module').then(m => m.UnoModule)
    },
    ]
  },
  {
    path:'**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
