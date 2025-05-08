package org.example.authservice.web;

import lombok.RequiredArgsConstructor;
import org.example.authservice.dtos.UpdateRequest;
import org.example.authservice.repository.UserRepository;
import org.example.authservice.services.UpdateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/update")
@RequiredArgsConstructor
public class UpdateController {

    private final UserRepository userRepository;
    private final UpdateService updateService;

    @PatchMapping
    public ResponseEntity<Map<String, String>> updateProfile(@RequestBody UpdateRequest request, Authentication authentication) {
        Map<String, String> response = updateService.updateProfile(request.getFullName(), request.getPassword(), authentication);
        return ResponseEntity.ok(response);
    }
}
