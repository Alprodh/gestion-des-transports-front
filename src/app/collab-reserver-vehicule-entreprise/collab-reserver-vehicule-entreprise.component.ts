import { VehiculeSansChauffeur } from './../models/VehiculeSansChauffeur';
import { ReservationEntreprise } from '../models/ReservationEntreprise';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../auth/auth.service';
import { formatDate } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-collab-reserver-vehicule-entreprise',
  templateUrl: './collab-reserver-vehicule-entreprise.component.html',
  styleUrls: ['./collab-reserver-vehicule-entreprise.component.scss']
})
export class CollabReserverVehiculeEntrepriseComponent implements OnInit {

  reservation = new ReservationEntreprise();
  today = new Date();
  todayStr: string;
  dateDepartMin: string;
  dateRetourMin: string;
  vehicules: VehiculeSansChauffeur[];
  vehiculeSelected: VehiculeSansChauffeur = new VehiculeSansChauffeur();
  dateValid = false;

  constructor( private authSrv: AuthService, private dataService: DataService, private modalService: NgbModal) {
    this.dateDepartMin = formatDate( this.today, 'yyyy-MM-ddThh:mm', 'fr-FR', '+0200');
  }

  setMinDateRetour(): void {
    this.dateRetourMin = formatDate( this.reservation.dateDepart, 'yyyy-MM-ddThh:mm', 'fr-FR', '+0200');
  }

  datesValides(): void {
    this.dateValid = this.vehicules.includes( this.vehiculeSelected) &&
      !this.vehiculeSelected.dispoReservation.filter( reserv => reserv.statutReservation === 'ACCEPTEE' || 'EN_ATTENTE')
      .some( datesInvalides =>
        ( new Date( this.reservation.dateDepart) >= new Date( datesInvalides.dateDepart)
        && new Date( this.reservation.dateDepart) <= new Date( datesInvalides.dateArrivee))
        || ( new Date( this.reservation.dateArrivee) >= new Date( datesInvalides.dateDepart)
        && new Date( this.reservation.dateArrivee) <= new Date( datesInvalides.dateArrivee)));
  }

  selectVehicule( vehicule: VehiculeSansChauffeur): void {
    if ( vehicule.statutVehicule === 'EN_SERVICE') {
      this.vehiculeSelected = vehicule;
      this.reservation.vehiculeId = vehicule.id;
    }
  }

  afficherConfirmation( content: any) {
    this.modalService.open( content);
  }

  reserver(): void {
    this.dataService.postReservationEntreprise( this.reservation);
    this.reservation = new ReservationEntreprise();
    this.vehiculeSelected = new VehiculeSansChauffeur();
    this.setMinDateRetour();
  }

  ngOnInit(): void {
    this.dataService.getVehiculesEntreprise().subscribe(
      vehicules => this.vehicules = vehicules
     );
    this.authSrv.collegueConnecteObs.subscribe(
      collegue => this.reservation.reservant = collegue.matricule
    );
  }

}
