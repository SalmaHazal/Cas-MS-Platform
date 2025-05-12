package org.example.authservice.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateRequest {
    private String fullName;
    private String password;
    private String functionality;
}
