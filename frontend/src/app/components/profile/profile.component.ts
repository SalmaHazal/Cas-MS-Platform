import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProfileService } from '../../services/profile-service.service';  // <-- Ajout du service
import { FormsModule } from '@angular/forms';  // <-- Importation de FormsModule

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,  // <-- Assure-toi que ton composant est standalone
  imports: [FooterComponent, NavbarComponent, FormsModule],  // <-- Ajout de FormsModule
})
export class ProfileComponent {
  fileMessage: string | null = null;
  username: string = '';  // <-- pour capturer le nouveau username
  selectedFile: File | null = null;  // <-- pour capturer le fichier choisi
  userId: number = 1;  // ⚡ à adapter selon comment tu récupères l'id du user (par ex via auth)

  constructor(private profileService: ProfileService) {}  // <-- Ajout du service

  updateFileName(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.fileMessage = 'Uploaded successfully';
    } else {
      this.selectedFile = null;
      this.fileMessage = null;
    }
  }

  saveChanges(): void {
    if (this.username) {
      this.profileService.updateUsername(this.userId, this.username).subscribe({
        next: () => console.log('Username updated successfully'),
        error: (err) => console.error('Error updating username', err),
      });
    }

    if (this.selectedFile) {
      this.profileService.updateProfilePicture(this.userId, this.selectedFile).subscribe({
        next: () => console.log('Profile picture updated successfully'),
        error: (err) => console.error('Error updating profile picture', err),
      });
    }
  }
}
