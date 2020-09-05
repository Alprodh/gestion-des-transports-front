import { CollabPublierAnnonceComponent } from './collab-publier-annonce/collab-publier-annonce.component';
import { AdminVehiculesEntrepriseComponent } from './admin-vehicules-entreprise/admin-vehicules-entreprise.component';
import { CollabReserverComponent } from './collab-reserver/collab-reserver.component';
import { CollabStatistiquesComponent } from './collab-statistiques/collab-statistiques.component';
import { CollabAnnoncesComponent } from './collab-annonces/collab-annonces.component';
import { CollabReservationsComponent } from './collab-reservations/collab-reservations.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechComponent } from './tech/tech.component';
import { StatutConnecteService } from './auth/statut-connecte.service';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, // /tech accessible uniquement si connecté
  { path: 'auth', component: AuthComponent },
  { path: 'collaborateur/reservations', component: CollabReservationsComponent },
  { path: 'collaborateur/annonces', component: CollabAnnoncesComponent },
  { path: 'collaborateur/annonces/creer', component: CollabPublierAnnonceComponent },
  { path: 'collaborateur/statistiques', component: CollabStatistiquesComponent },
  { path: 'collaborateur/reserver', component: CollabReserverComponent },
  { path: 'administrateur/vehicules', component: AdminVehiculesEntrepriseComponent },
  { path: '', redirectTo: '/tech', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
