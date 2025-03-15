package org.example.authservice.web;

import jakarta.validation.Valid;
import org.example.authservice.dtos.LoginRequest;
import org.example.authservice.dtos.RegisterRequest;
import org.example.authservice.entities.Cell;
import org.example.authservice.entities.Gender;
import org.example.authservice.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthRestController {
    public AuthService authService;

    public AuthRestController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/profile")
    public ResponseEntity<Authentication> authentication(Authentication authentication) {
        return ResponseEntity.ok(authentication);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        Map<String, String> response = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(response);
    }

//    @PostMapping(path = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest request) {
        Map<String, Object> response = authService.register(
                request.getFullName(),
                request.getEmail(),
                request.getPassword(),
                request.getGender(),
                request.getCell()
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
