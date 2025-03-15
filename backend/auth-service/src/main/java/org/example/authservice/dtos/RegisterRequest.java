package org.example.authservice.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;
import org.example.authservice.entities.Cell;
import org.example.authservice.entities.Gender;

@Getter
@Setter
public class RegisterRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    private Gender gender;
    private Cell cell;
    private String studentId;
}
