package com.volunteeringPlatform.volunteeringPlatformBackend.repository;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}

