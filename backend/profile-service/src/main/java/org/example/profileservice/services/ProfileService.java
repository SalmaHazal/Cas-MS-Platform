package org.example.profileservice.services;

import lombok.RequiredArgsConstructor;
import org.example.profileservice.entities.Profile;
import org.example.profileservice.repositories.ProfileRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    public Profile createOrUpdateProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Optional<Profile> getProfileById(Long id) {
        return profileRepository.findById(id);
    }

    public void deleteProfilePicture(Long id) {
        Optional<Profile> optionalProfile = profileRepository.findById(id);
        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            profile.setProfilePicture(null);
            profileRepository.save(profile);
        }
    }

    public void updateUsername(Long id, String newUsername) {
        Optional<Profile> optionalProfile = profileRepository.findById(id);
        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            profile.setUsername(newUsername);
            profileRepository.save(profile);
        }
    }
}

