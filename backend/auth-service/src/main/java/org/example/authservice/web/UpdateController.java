package org.example.authservice.web;

import lombok.RequiredArgsConstructor;
import org.example.authservice.dtos.UpdateRequest;
import org.example.authservice.repository.UserRepository;
import org.example.authservice.services.UpdateService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/update")
@RequiredArgsConstructor
public class UpdateController {

    private final UpdateService updateService;

    @PatchMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Map<String, String>> updateProfile(
            String fullName,
            String password,
            String functionality,
            @RequestParam(required = false) MultipartFile file,
            Authentication authentication) throws IOException {
        Map<String, String> response = updateService.updateProfile(fullName, password, functionality, file, authentication);
        return ResponseEntity.ok(response);
    }
}
