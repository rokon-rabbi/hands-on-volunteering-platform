package com.volunteeringPlatform.volunteeringPlatformBackend.service;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.VolunteerActivity;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.VolunteerActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VolunteerActivityService {
    private final VolunteerActivityRepository volunteerActivityRepository;

    public List<VolunteerActivity> getUserVolunteerHistory(UUID userId) {
        return volunteerActivityRepository.findByUser_Id(userId); // Fixed repository call
    }
}
