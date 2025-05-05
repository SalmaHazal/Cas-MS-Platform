package com.profile.profil_service.repository;


import com.profile.profil_service.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    // On peut ajouter des méthodes custom ici plus tard si besoin
}
