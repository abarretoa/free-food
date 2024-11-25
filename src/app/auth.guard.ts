import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user && user.perfil) {
      return true; // O usuário está autenticado e pode acessar a rota
    }
    this.router.navigate(['/login']); // Redireciona para login caso não esteja autenticado
    return false;
  }
}
