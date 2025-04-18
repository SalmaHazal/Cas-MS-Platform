import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrentProjectComponent } from '../current-project/current-project.component';
import { SponsorsSectionComponent } from '../sponsors-section/sponsors-section.component';
import { ContactSectionComponent } from '../contact-section/contact-section.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [CurrentProjectComponent, RouterLink, SponsorsSectionComponent, ContactSectionComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  ngOnInit(): void {
      
  }

}
