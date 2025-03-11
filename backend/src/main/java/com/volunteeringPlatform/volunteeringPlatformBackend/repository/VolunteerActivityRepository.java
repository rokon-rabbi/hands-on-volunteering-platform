package com.volunteeringPlatform.volunteeringPlatformBackend.repository;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.VolunteerActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface VolunteerActivityRepository extends JpaRepository<VolunteerActivity, UUID> {
    List<VolunteerActivity> findByUser_Id(UUID userId); // Fixed method to fetch volunteer activities for a user
}
