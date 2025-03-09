package org.example.authservice.web;

import org.example.authservice.entities.User;
import org.example.authservice.services.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthRestController {
    public AuthService authService;

    public AuthRestController(AuthService authService) {
        this.authService = authService;
    }

//    @GetMapping("/profile")
//    public Authentication authentication(Authentication authentication) {
//        return authentication;
//    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        return authService.login(username, password);
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        return authService.register(username, password);
    }
}
