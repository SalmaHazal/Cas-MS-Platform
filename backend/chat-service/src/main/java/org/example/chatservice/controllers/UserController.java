package org.example.chatservice.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.chatservice.dtos.UserResponse;
import org.example.chatservice.feignClient.UserFeignClient;
import org.example.chatservice.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {
    private final UserService userService;
    private final UserFeignClient userFeignClient;

    @GetMapping("/currentuser") @ResponseStatus(HttpStatus.OK)
    public Long currentUser(){
        return userFeignClient.currentUserId();
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        Long currentUserId = userFeignClient.currentUserId();
        return ResponseEntity.ok(userService.getAllUsersExceptSelf(currentUserId));
    }
}
