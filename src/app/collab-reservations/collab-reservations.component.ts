import { AuthService } from './../auth/auth.service';
import { ReservationCovoiturageAffichage } from './../models/ReservationCovoiturageAffichage';
import { ReservationEntrepriseAffichage } from './../models/ReservationEntrepriseAffichage';
import { DataService } from './../services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-collab-reservations',
  templateUrl: './collab-reservations.component.html',
  styleUrls: ['./collab-reservations.component.css']
})
export class CollabReservationsComponent implements OnInit, OnDestroy {
  showVehicules = false;
  showCovoiturages = true;
  showCourses = false;
  reservationsCovoiturageHistoriqueAffichage: ReservationCovoiturageAffichage[] = [];
  reservationsCovoiturageEnCoursAffichage: ReservationCovoiturageAffichage[] = [];
  reservationsEntrepriseHistoriqueAffichage: ReservationEntrepriseAffichage[] = [];
  reservationsEntrepriseEnCoursAffichage: ReservationEntrepriseAffichage[] = [];
  matricule: string;
  constructor(protected dataService: DataService, protected authService: AuthService) { }

  toggleVehicules() {
    this.showVehicules = !this.showVehicules;
  }
  toggleCovoiturages() {
    this.showCovoiturages = !this.showCovoiturages;
  }
  toggleCourses() {
    this.showCourses = !this.showCourses;
  }

  ngOnInit(): void {
    this.authService.collegueConnecteObs.subscribe(
      value => this.matricule = value.matricule,
      err => { },
      () => { }
    );

    this.dataService.getAllReservationsCovoiturageAffichageByPassager().subscribe(
      value => {
        this.reservationsCovoiturageHistoriqueAffichage = value.filter(
          reservation => new Date(reservation.dateDepart).getTime() < Date.now() ||
            reservation.statutReservationCovoiturage === 'ANNULEE'
        );
        this.reservationsCovoiturageEnCoursAffichage = value.filter(
          reservation => new Date(reservation.dateDepart).getTime() >= Date.now() &&
            reservation.statutReservationCovoiturage !== 'ANNULEE'
        );
      },
      err => { },
      () => { }
    );

    this.dataService.getAllReservationsEntrepriseAffichageByReservant( this.matricule).subscribe(
      value => {
        this.reservationsEntrepriseHistoriqueAffichage = value.filter(
          reservation => reservation.statut !== 'ANNULEE').filter(
          reservation => new Date( reservation.dateArrivee).getTime() < Date.now());
        this.reservationsEntrepriseEnCoursAffichage = value.filter(
          reservation => new Date( reservation.dateArrivee).getTime() >= Date.now());
      },
      err => { },
      () => { }
    );
  }

  ngOnDestroy() {
  }

}
