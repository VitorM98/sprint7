import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VeiculosAPI } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'http://localhost:3001/vehicles';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<VeiculosAPI> {
    return this.http.get<VeiculosAPI>(this.apiUrl);
  }
}
