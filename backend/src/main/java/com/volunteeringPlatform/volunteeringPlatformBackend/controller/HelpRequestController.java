package com.volunteeringPlatform.volunteeringPlatformBackend.controller;

import com.volunteeringPlatform.volunteeringPlatformBackend.dto.HelpRequestCreateRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.HelpRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.service.HelpRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/help-requests")
public class HelpRequestController {

    @Autowired
    private HelpRequestService helpRequestService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<HelpRequest> createHelpRequest(
            @RequestBody HelpRequestCreateRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        HelpRequest helpRequest = helpRequestService.createHelpRequest(request, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(helpRequest);
    }

}
