package com.volunteeringPlatform.volunteeringPlatformBackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class CommentResponse {
    private UUID id;
    private String message;
    private String username;
    private LocalDateTime createdAt;
}
