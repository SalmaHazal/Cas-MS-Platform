package org.example.chatservice.services;

import lombok.RequiredArgsConstructor;
import org.example.chatservice.dtos.UserResponse;
import org.example.chatservice.entities.User;
import org.example.chatservice.mappers.UserMapper;
import org.example.chatservice.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserResponse> getAllUsersExceptSelf(Long currentUserId) {
        return userRepository.findAllUsersExceptSelf(currentUserId)
                .stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    public String getEmailById(Long userId) {
        return userRepository.findById(userId)
                .map(User::getEmail)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));
    }
}
