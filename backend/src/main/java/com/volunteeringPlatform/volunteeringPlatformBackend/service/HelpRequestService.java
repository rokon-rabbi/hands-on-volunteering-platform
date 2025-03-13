package com.volunteeringPlatform.volunteeringPlatformBackend.service;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.HelpRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.HelpRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HelpRequestService {

    private final HelpRequestRepository helpRequestRepository;

    public HelpRequest createHelpRequest(HelpRequest helpRequest, String userId) {
        helpRequest.setCreatorId(userId); // Set user ID from JWT
        helpRequest.setStatus(HelpRequest.RequestStatus.OPEN);
        return helpRequestRepository.save(helpRequest);
    }

    public List<HelpRequest> getAllHelpRequests() {
        return helpRequestRepository.findAll();
    }

    public Optional<HelpRequest> getHelpRequestById(UUID id) {
        return helpRequestRepository.findById(id);
    }

    public HelpRequest updateRequestStatus(UUID id, HelpRequest.RequestStatus status) {
        return helpRequestRepository.findById(id).map(request -> {
            request.setStatus(status);
            return helpRequestRepository.save(request);
        }).orElseThrow(() -> new RuntimeException("Help request not found"));
    }
}

