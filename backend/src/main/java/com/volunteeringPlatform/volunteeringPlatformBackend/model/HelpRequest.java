package com.volunteeringPlatform.volunteeringPlatformBackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "help_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HelpRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private UrgencyLevel urgency;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;
}
