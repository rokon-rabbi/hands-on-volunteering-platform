package com.volunteeringPlatform.volunteeringPlatformBackend.dto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProfileUpdateRequest {
    private String username;
    private String email;
    private List<String> skills;
    private List<String> causes;
}
