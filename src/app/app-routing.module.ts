import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'form-response', pathMatch: 'full' },
      {
        path: '',
        canActivateChild: [],
        children: [
          {
            path: 'form-response',
            loadChildren: () =>
              import('./modules/form-reponse/form-reponse.module').then(m => m.FormReponseModule)
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
