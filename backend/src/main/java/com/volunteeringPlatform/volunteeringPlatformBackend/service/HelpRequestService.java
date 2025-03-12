package com.volunteeringPlatform.volunteeringPlatformBackend.service;

import com.volunteeringPlatform.volunteeringPlatformBackend.dto.HelpRequestCreateRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.HelpRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.RequestStatus;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.HelpRequestRepository;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HelpRequestService {

    @Autowired
    private HelpRequestRepository helpRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public HelpRequest createHelpRequest(HelpRequestCreateRequest request, String creatorEmail) {
        User creator = userRepository.findByEmail(creatorEmail)
                .orElseThrow(() -> new EntityNotFoundException("Creator not found"));

        HelpRequest helpRequest = new HelpRequest();
        helpRequest.setTitle(request.getTitle());
        helpRequest.setDescription(request.getDescription());
        helpRequest.setUrgency(request.getUrgency());
        helpRequest.setCreator(creator);
        helpRequest.setStatus(RequestStatus.OPEN);

        return helpRequestRepository.save(helpRequest);
    }

    public List<HelpRequest> getAllHelpRequests() {
        return helpRequestRepository.findAll();
    }

    public HelpRequest offerHelp(String requestId, String userEmail) {
        HelpRequest helpRequest = helpRequestRepository.findById(requestId)
                .orElseThrow(() -> new EntityNotFoundException("Help request not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Add business logic for offering help (e.g., notifications)

        return helpRequest;
    }
}
