import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home-doador',
    loadChildren: () => import('./home-doador/home-doador.module').then(m => m.HomeDoadorPageModule),
   // canActivate: [AuthService] // Protege a rota de acordo com o perfil
  },
  {
    path: 'home-beneficiado',
    loadChildren: () => import('./home-beneficiado/home-beneficiado.module').then(m => m.HomeBeneficiadoPageModule),
    //canActivate: [AuthService] // Protege a rota de acordo com o perfil
  },
  {
    path: 'my-donations',
    loadChildren: () => import('./my-donations/my-donations.module').then(m => m.MyDonationsPageModule)
  },
  {
    path: 'new-donation',
    loadChildren: () => import('./new-donation/new-donation.module').then(m => m.NewDonationPageModule)
  },
  {
    path: 'alimentos-disponiveis',
    loadChildren: () => import('./alimentos-disponiveis/alimentos-disponiveis.module').then(m => m.AlimentosDisponiveisPageModule)
  },
  // A rota de logout deve ser apenas para redirecionar, sem carregar página
  {
    path: 'logout',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'itens-salvos',
    loadChildren: () => import('./itens-salvos/itens-salvos.module').then( m => m.ItensSalvosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
