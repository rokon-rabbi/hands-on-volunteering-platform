package com.volunteeringPlatform.volunteeringPlatformBackend.dto;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.RequestStatus;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.UrgencyLevel;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HelpRequestDTO {
    private UUID id;
    private String title;
    private String description;
    private UrgencyLevel urgency;
    private RequestStatus status;
    private String creatorUsername;
    private LocalDateTime createdAt;
    private List<CommentResponse> comments;  // Added comments to response
}
