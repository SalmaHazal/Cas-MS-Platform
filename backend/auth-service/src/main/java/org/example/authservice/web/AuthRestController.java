package org.example.authservice.web;

import org.example.authservice.dtos.LoginRequest;
import org.example.authservice.entities.Gender;
import org.example.authservice.entities.User;
import org.example.authservice.repository.UserRepository;
import org.example.authservice.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthRestController {
    private final UserRepository userRepository;
    public AuthService authService;

    public AuthRestController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        Map<String, Object> response = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(response);
    }

//    @PostMapping(path = "/register", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
//    public ResponseEntity<Map<String, Object>> register(
//            @RequestPart RegisterRequest request,
//            @RequestParam(required = false) MultipartFile file
//    ) throws IOException {
//        Map<String, Object> response = authService.register(
//                request.getFullName(),
//                request.getEmail(),
//                request.getPassword(),
//                request.getGender(),
//                request.getQuestion(),
//                request.getRole(),
//                file
//        );
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//    }

    @PostMapping(path = "/register", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Map<String, Object>> register(
            String fullName,
            String email,
            String password,
            Gender gender,
            String question,
            String functionality,
            @RequestParam(required = false) MultipartFile file
    ) throws IOException {
        Map<String, Object> response = authService.register(
                fullName,
                email,
                password,
                gender,
                question,
                functionality,
                file
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/profile")
    public ResponseEntity<Long> authentication(Authentication authentication) {
        String userEmail = authentication.getName();
        return userRepository.findByEmail(userEmail)
                .map(user -> ResponseEntity.ok(user.getId()))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> fetchUserDetails(Authentication authentication) {
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));


        Map<String, Object> userResponse = Map.of(
                "email", user.getEmail(),
                "fullName", user.getFullName(),
                "functionality", Objects.requireNonNullElse(user.getFunctionality(), "unknown"),
                "picturePath", Objects.requireNonNullElse(user.getPicturePath(), "unknown")
        );

        return ResponseEntity.ok(userResponse);
    }

}
