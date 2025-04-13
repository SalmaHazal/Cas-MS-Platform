package org.example.chatservice.mappers;

import org.example.chatservice.dtos.UserResponse;
import org.example.chatservice.entities.User;
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
