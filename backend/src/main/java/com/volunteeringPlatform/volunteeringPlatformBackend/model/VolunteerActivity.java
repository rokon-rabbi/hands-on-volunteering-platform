package com.volunteeringPlatform.volunteeringPlatformBackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "volunteer_activities")
public class VolunteerActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String cause;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDateTime dateParticipated;
}
