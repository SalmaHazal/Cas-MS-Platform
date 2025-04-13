package org.example.chatservice.dtos;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.chatservice.common.BaseAuditingEntity;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO extends BaseAuditingEntity {
    private Long id;

    private String fullName;

    private String email;

    private String password;

    private Gender gender;

    private String role;

    private LocalDateTime lastSeen;
}
