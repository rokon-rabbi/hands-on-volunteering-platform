package com.volunteeringPlatform.volunteeringPlatformBackend.model;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HelpRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private UrgencyLevel urgency;

    private String creatorId;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    public enum UrgencyLevel {
        LOW, MEDIUM, URGENT
    }

    public enum RequestStatus {
        OPEN, CLOSED
    }
}
