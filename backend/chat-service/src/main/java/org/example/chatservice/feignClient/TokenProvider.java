package org.example.chatservice.feignClient;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;


@Component
public class TokenProvider {

    private final HttpServletRequest request;

    public TokenProvider(HttpServletRequest request) {
        this.request = request;
    }

    public String getToken() {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7); // Remove "Bearer " prefix
        }
        return null;
    }
}

