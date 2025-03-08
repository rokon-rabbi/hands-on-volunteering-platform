package com.volunteeringPlatform.volunteeringPlatformBackend.dto;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.Role;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String username;
    private String email;
    private Role role;
}


