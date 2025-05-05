package com.profile.profil_service.controller;

import com.profile.profil_service.entities.Profile;
import com.profile.profil_service.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;  // Ajoutez cette ligne ici

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/")
    public ResponseEntity<Profile> createOrUpdateProfile(@RequestBody Profile profile) {
        Profile savedProfile = profileService.createOrUpdateProfile(profile);
        return ResponseEntity.ok(savedProfile);
    }

    @PutMapping("/{id}/username")
    public ResponseEntity<?> updateUsername(@PathVariable Long id, @RequestParam String username) {
        profileService.updateUsername(id, username);
        return ResponseEntity.ok("Username updated successfully");
    }

    @PutMapping("/{id}/photo")
    public ResponseEntity<?> updateProfilePicture(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Optional<Profile> optionalProfile = profileService.getProfileById(id);
        if (optionalProfile.isPresent()) {
            try {
                Profile profile = optionalProfile.get();

                // Dossier d'upload (relatif au projet)
                String uploadDirPath = System.getProperty("user.dir") + "/uploads/";
                File uploadDir = new File(uploadDirPath);

                // Créer le dossier s'il n'existe pas
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                // Construire le chemin complet du fichier
                String fileName = file.getOriginalFilename();
                File destFile = new File(uploadDirPath + fileName);

                // Sauvegarder le fichier sur le disque
                file.transferTo(destFile);

                // Mettre à jour le chemin de la photo dans le profil
                profile.setProfilePicture("uploads/" + fileName); // On garde un chemin relatif pour l'affichage

                profileService.createOrUpdateProfile(profile);

                return ResponseEntity.ok("Profile picture updated and saved successfully");

            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Erreur lors de l'upload de la photo");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/photo")
    public ResponseEntity<?> deleteProfilePicture(@PathVariable Long id) {
        profileService.deleteProfilePicture(id);
        return ResponseEntity.ok("Profile picture deleted successfully");
    }

    // Nouvelle méthode pour récupérer la photo de profil
    @GetMapping("/{id}/photo")
    public ResponseEntity<?> getProfilePicture(@PathVariable Long id) {
        Optional<Profile> optionalProfile = profileService.getProfileById(id);
        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            String photoPath = profile.getProfilePicture();

            // Vérifier si le fichier de la photo existe
            File photoFile = new File(System.getProperty("user.dir") + "/" + photoPath);
            if (photoFile.exists()) {
                try (InputStream imageStream = new FileInputStream(photoFile)) {
                    byte[] imageBytes = imageStream.readAllBytes();

                    // Retourner l'image avec le bon type MIME
                    return ResponseEntity.ok()
                            .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")  // Ajustez le type MIME en fonction du format de votre image
                            .body(imageBytes);

                } catch (IOException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Erreur lors de la récupération de la photo");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Photo non trouvée");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profil non trouvé");
        }
    }
}
