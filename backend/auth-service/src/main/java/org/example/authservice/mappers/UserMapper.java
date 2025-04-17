package org.example.authservice.mappers;

import org.example.authservice.dtos.UserResponse;
import org.example.authservice.entities.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .lastSeen(user.getLastSeen())
                .isOnline(user.isUSerOnline())
                .build();
    }
}
