import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 toggleMenu(): void {
    const menu = document.getElementById('menuModal');
    const btn = document.getElementById('btn-menu');
    const overlay = document.getElementById('overlay');

    menu?.classList.toggle('ativo');
    btn?.classList.toggle('ativo');
    overlay?.classList.toggle('ativo');
    }

       constructor(private authService:AuthService){}

    logout():void{
      this.authService.logout();
  }

  fecharBoasVindas(): void {
    const caixa = document.getElementById('boasVindas');
    if (caixa) caixa.style.display = 'none';
  }
}
