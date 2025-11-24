import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  toggleMenu(): void {
    const menu = document.getElementById('menuModal');
    const btn = document.getElementById('btn-menu');
    const overlay = document.getElementById('overlay');

    menu?.classList.toggle('ativo');
    btn?.classList.toggle('ativo');
    overlay?.classList.toggle('ativo');
  }

  fecharBoasVindas(): void {
    const caixa = document.getElementById('boasVindas');
    if (caixa) caixa.style.display = 'none';
  }
}
