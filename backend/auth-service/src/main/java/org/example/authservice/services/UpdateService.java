package org.example.authservice.services;

import lombok.RequiredArgsConstructor;
import org.example.authservice.entities.User;
import org.example.authservice.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpdateService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Map<String, String> updateProfile(String fullName, String password, String functionality, MultipartFile file, Authentication authentication) throws IOException {
        String email = authentication.getName();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        User user = optionalUser.get();

        if (fullName != null && !fullName.trim().isEmpty()) {
            user.setFullName(fullName);
        }

        if (functionality != null && !functionality.trim().isEmpty()) {
            user.setFunctionality(functionality);
        }

        if (password != null && !password.trim().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(password);
            user.setPassword(encodedPassword);
        }

        if (file != null && !file.isEmpty()) {
            Path folderPath = Path.of(System.getProperty("user.dir"), "auth-service", "src", "main", "resources", "pictureProfiles");
            if (!Files.exists(folderPath)) {
                Files.createDirectories(folderPath);
            }
            String fileName = UUID.randomUUID().toString();
            Path filePath = folderPath.resolve(fileName+".png");
            Files.copy(file.getInputStream(), filePath);

            user.setPicturePath(fileName+".png");
        }

        userRepository.save(user);

        return Map.of(
                "message", "Profile updated successfully"
        );
    }
}
