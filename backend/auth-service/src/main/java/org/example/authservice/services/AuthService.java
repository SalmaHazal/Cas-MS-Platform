package org.example.authservice.services;

import org.example.authservice.entities.Gender;
import org.example.authservice.entities.User;
import org.example.authservice.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AuthService {

    public AuthenticationManager authenticationManager;
    public JwtEncoder jwtEncoder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, JwtEncoder jwtEncoder, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtEncoder = jwtEncoder;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Map<String, Object> login(String email, String password) {
        try {
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
            }

            User user = optionalUser.get();

            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password");
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            Instant instant = Instant.now();
            String scope = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(" "));

            JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                    .issuedAt(instant)
                    .expiresAt(instant.plus(5, ChronoUnit.HOURS))
                    .subject(email)
                    .claim("scope", scope)
                    .build();

            JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(
                    JwsHeader.with(MacAlgorithm.HS512).build(),
                    jwtClaimsSet
            );

            String jwt = jwtEncoder.encode(jwtEncoderParameters).getTokenValue();

            Map<String, Object> userResponse = Map.of(
                    "email", user.getEmail(),
                    "fullName", user.getFullName(),
                    "functionality", user.getFunctionality() != null ? user.getFunctionality() : "unknown",
                    "picturePath", user.getPicturePath() != null ? user.getPicturePath() : "unknown"
            );

            return Map.of(
                    "message", "Login successful",
                    "access-token", jwt,
                    "user", userResponse
            );

        } catch (Exception e) {
            e.printStackTrace();

            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred: " + e.getMessage());
        }
    }


    public Map<String, Object> register(String fullName, String email, String password, Gender gender, String question, String functionality, MultipartFile file) throws IOException {

        if (userRepository.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        String encodedPassword = passwordEncoder.encode(password);

        Path folderPath = Path.of(System.getProperty("user.dir"), "auth-service", "src", "main", "resources", "pictureProfiles");
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }
        String fileName = UUID.randomUUID().toString();
        Path filePath = folderPath.resolve(fileName+".png");
        Files.copy(file.getInputStream(), filePath);

        User user = User.builder()
                .email(email)
                .fullName(fullName)
                .password(encodedPassword)
                .gender(gender)
                .question(question)
                .functionality(functionality)
                .role("USER")
                .picturePath(fileName+".png")
                .build();

        User savedUser = userRepository.save(user);

        return Map.of("message", "Registration successful", "user", savedUser);
    }
}
