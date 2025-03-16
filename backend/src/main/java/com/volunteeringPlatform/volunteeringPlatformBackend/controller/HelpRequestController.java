package com.volunteeringPlatform.volunteeringPlatformBackend.controller;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.HelpRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.service.HelpRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/help-requests")
@RequiredArgsConstructor
public class HelpRequestController {

    @Autowired
    private  HelpRequestService helpRequestService;

    @PostMapping
    public ResponseEntity<HelpRequest> createHelpRequest(
            @RequestBody HelpRequest helpRequest,
            @AuthenticationPrincipal UserDetails userDetails) {

        String userId = userDetails.getUsername();
        return ResponseEntity.ok(helpRequestService.createHelpRequest(helpRequest, userId));
    }


    @GetMapping
    public ResponseEntity<List<HelpRequest>> getAllHelpRequests() {
        return ResponseEntity.ok(helpRequestService.getAllHelpRequests());
    }
    @GetMapping("/{id}")
    public ResponseEntity<HelpRequest> getHelpRequestById(@PathVariable UUID id) {
        return ResponseEntity.ok(helpRequestService.getHelpRequestById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<HelpRequest> updateRequestStatus(
            @PathVariable UUID id,
            @RequestParam HelpRequest.RequestStatus status) {
        return ResponseEntity.ok(helpRequestService.updateRequestStatus(id, status));
    }
}
