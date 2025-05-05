import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sponsors-section',
  imports: [CommonModule],
  templateUrl: './sponsors-section.component.html',
  styleUrl: './sponsors-section.component.css'
})
export class SponsorsSectionComponent {
  associations = [
    { name: 'Association AL Rayane', image: 'assets/images/partenaire-logo-68.jpg', link: 'https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index' },
    { name: 'Solident', image: 'assets/images/th.jpeg', link: 'https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=vtw-index' },
    { name: 'Coeur Ouvert', image: 'assets/images/ouvert.png', link: 'https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=vtw-index' },
    { name: 'APEMD', image: 'assets/images/apemd.jpg', link: 'https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index' },
    { name: 'Ibtassim Foundation', image: 'assets/images/ibtassim.jpg', link: 'https://www.creative-tim.com/learning-lab/tailwind/angular/alerts/notus?ref=vtw-index' },
    { name: 'Fondation Assalam', image: 'assets/images/assalam.png', link: 'https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vtw-index' },
  ];
  currentPage = 1;
  itemsPerPage = 3;
  totalPages = 0; // Nombre total de pages
  associationsPaginated: any[] = []; // Tableau des éléments affichés sur la page actuelle
  date: string = new Date().getFullYear().toString(); // Année actuelle

  constructor() {
    this.calculatePages();
  }

  // Calculer le nombre total de pages
  calculatePages() {
    this.totalPages = Math.ceil(this.associations.length / this.itemsPerPage);
    this.updateAssociationsForCurrentPage();
  }

  // Mettre à jour les éléments affichés en fonction de la page actuelle
  updateAssociationsForCurrentPage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.associationsPaginated = this.associations.slice(start, end);
  }

  // Passer à la page précédente
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateAssociationsForCurrentPage();
    }
  }

  // Passer à la page suivante
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateAssociationsForCurrentPage();
    }
  }

}
