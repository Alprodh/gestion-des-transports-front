import { ReservationEntreprise } from '../models/ReservationEntreprise';
import { VehiculeSansChauffeur } from '../models/VehiculeSansChauffeur';
import { VehiculeEntrepriseInfosGenerales } from './../models/VehiculeEntrepriseInfosGenerales';
import { AnnonceCovoiturageAffichage } from './../models/AnnonceCovoiturageAffichage';
import { AnnonceCovoiturage } from './../models/AnnonceCovoiturage';
import { ReservationCovoiturageAffichage } from './../models/ReservationCovoiturageAffichage';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ChauffeurDto } from '../models/ChauffeurDto';
import { ReservationVehiculeAffichage } from '../models/ReservationVehiculeAffichage';
import { AnnonceDto } from '../models/AnnonceDto';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL_BACKEND: string = environment.baseUrl;

  constructor( private http: HttpClient) {}

  creerAnnonceCovoit( annonce: AnnonceCovoiturage): void {
    const request: string = this.URL_BACKEND + 'reservations-covoiturage/';
    this.http.post<AnnonceCovoiturage>( request, annonce);
  }

  getAllReservationsCovoiturageAffichageByPassager(): Observable<ReservationCovoiturageAffichage[]> {
    return this.http.get<ReservationCovoiturageAffichage[]>(this.URL_BACKEND + 'reservations-covoiturage/me');
  }

  getAllAnnoncesCovoiturageAffichage(): Observable<AnnonceCovoiturageAffichage[]> {
    return this.http.get<AnnonceCovoiturageAffichage[]>(this.URL_BACKEND + 'reservations-covoiturage');
  }

  MAjouterCommePassagerCovoiturage(annonce: AnnonceCovoiturageAffichage): Observable<AnnonceCovoiturageAffichage> {
    return this.http.put<AnnonceCovoiturageAffichage>(this.URL_BACKEND + 'reservations-covoiturage', annonce);
  }

  getVehiculesEntreprise(): Observable<VehiculeSansChauffeur[]> {
    const request: string = this.URL_BACKEND + 'reservation-entreprise/vehicules/';
    return this.http.get<VehiculeSansChauffeur[]>( request);
  }

  postReservationEntreprise( reservation: ReservationEntreprise): void {
    const request: string = this.URL_BACKEND + 'reservation-entreprise/';
    this.http.post<ReservationEntreprise>( request, reservation);
  }

  getAllVehiculesEntreprise(): Observable<VehiculeEntrepriseInfosGenerales[]> {
    return this.http.get<VehiculeEntrepriseInfosGenerales[]>(this.URL_BACKEND + 'vehicules-entreprise');
  }

  creerVehiculeEntreprise(vehicule: VehiculeEntrepriseInfosGenerales): Observable<VehiculeEntrepriseInfosGenerales> {
    return this.http.post<VehiculeEntrepriseInfosGenerales>(this.URL_BACKEND + 'vehicules-entreprise', vehicule);
  }

  getAllChauffeurs(): Observable<ChauffeurDto[]> {
    return this.http.get<ChauffeurDto[]>(this.URL_BACKEND + 'administrateur/chauffeurs');
  }


  getAllReservationsVehiculeAffichageByPassager(): Observable<ReservationVehiculeAffichage[]> {
    return this.http.get<ReservationVehiculeAffichage[]>(this.URL_BACKEND + 'reservations-vehicules/me');
  }
}

