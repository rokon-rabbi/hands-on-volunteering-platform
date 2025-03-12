package com.volunteeringPlatform.volunteeringPlatformBackend.repository;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
    List<Event> findByCategory(String category);
    List<Event> findByLocation(String location);
    List<Event> findByCategoryAndLocation(String category, String location);
}
