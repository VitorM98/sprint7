import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Adicionado 'of' para compatibilidade (embora não esteja sendo usado diretamente aqui)

// Interface para estruturar os dados do VIN (Boa prática)
interface VinData {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}


@Component({
  selector: 'app-dashboard',
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  toggleMenu(): void {
    const menu = document.getElementById('menuModal');
    const btn = document.getElementById('btn-menu');
    const overlay = document.getElementById('overlay');

    menu?.classList.toggle('ativo');
    btn?.classList.toggle('ativo');
    overlay?.classList.toggle('ativo');
  }

  vehicles: any[] = [];
  selectedVehicle: any = null;

  salesTotal: number = 0;
  connectedTotal: number = 0;
  updateTotal: number = 0;

  carImage: string = '';

  availableVins: string[] = [
    "2FRHDUYS2Y63NHD22454",
    "2RFAASDY54E4HDU34874",
    "2FRHDUYS2Y63NHD22455",
    "2RFAASDY54E4HDU34875",
    "2FRHDUYS2Y63NHD22654",
    "2FRHDUYS2Y63NHD22854"
  ];
  
  // Inicializa o FormControl com o primeiro VIN para carregar os dados
  vinInput = new FormControl(this.availableVins.length > 0 ? this.availableVins[0] : '');
  vinData: VinData | null = null; 

  constructor(private authService:AuthService, private http: HttpClient){}

  ngOnInit(): void {
    this.loadVehicles();

    // Carrega os dados do VIN inicial (o primeiro da lista)
    if (this.availableVins.length > 0) {
      this.loadVinData(this.availableVins[0]);
    }
    
    // Assina as mudanças no seletor/campo VIN
    this.vinInput.valueChanges.subscribe(vin => {
      // Ajuste para carregar dados assim que o VIN mudar
      if (vin && vin.length > 5) {
        this.loadVinData(vin);
      } else {
        this.vinData = null;
      }
    });
  }

  logout():void{
    this.authService.logout();
  }

  loadVehicles() {
    this.http.get<any>('http://localhost:3001/vehicles').subscribe({
      next: (res) => {
        this.vehicles = res.vehicles;

        // Se existe pelo menos um veículo
        if (this.vehicles.length > 0) {

          const first = this.vehicles[0];
          this.selectedVehicle = first.vehicle;

          // Carrega automaticamente os dados do primeiro item
          this.fillVehicleData(first.vehicle);
        }
      },
      error: () => console.error('Erro ao carregar veículos!') // Usando console.error em vez de alert
    });
  }

  fillVehicleData(vehicleName: string) {
    const v = this.vehicles.find(x => x.vehicle === vehicleName);
    if (!v) return;

    this.salesTotal = v.volumetotal;
    this.connectedTotal = v.connected;
    this.updateTotal = v.softwareUpdates;
    this.carImage = v.img;
  }

  onVehicleChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.fillVehicleData(value);
  }
  
  //  tipado para VinData
  loadVinData(vin: string) {
    this.http.post<VinData>('http://localhost:3001/vehicleData', { vin }).subscribe({
      next: (res) => this.vinData = res,
      error: () => {
        console.error('VIN não encontrado ou erro de API.');
        this.vinData = null;
      }
    });
  }
  
  // Função auxiliar para formatar odômetro
  formatOdometro(value: number | undefined): string {
    if (value === undefined || value === null) return '---';
    return `${value.toLocaleString('pt-BR')} Km`;
  }

  // Função auxiliar para formatar Nível de Combustível
  formatFuelLevel(value: number | undefined): string {
    if (value === undefined || value === null) return '---';
    return `${value} %`;
  }
}