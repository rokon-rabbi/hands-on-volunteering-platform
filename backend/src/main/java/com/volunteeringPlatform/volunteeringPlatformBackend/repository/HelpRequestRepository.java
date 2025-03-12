package com.volunteeringPlatform.volunteeringPlatformBackend.repository;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.HelpRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelpRequestRepository extends JpaRepository<HelpRequest, String> {
}
