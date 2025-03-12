package com.volunteeringPlatform.volunteeringPlatformBackend.dto;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.UrgencyLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HelpRequestCreateRequest {
    private String title;
    private String description;
    private UrgencyLevel urgency;
}
