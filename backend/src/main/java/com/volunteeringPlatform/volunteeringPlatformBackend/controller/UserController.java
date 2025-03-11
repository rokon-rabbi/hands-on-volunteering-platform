package com.volunteeringPlatform.volunteeringPlatformBackend.controller;

import com.volunteeringPlatform.volunteeringPlatformBackend.dto.ProfileUpdateRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.VolunteerActivity;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.UserRepository;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.VolunteerActivityRepository;
import com.volunteeringPlatform.volunteeringPlatformBackend.service.UserService;
import com.volunteeringPlatform.volunteeringPlatformBackend.service.VolunteerActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private VolunteerActivityRepository volunteerActivityRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VolunteerActivityService volunteerActivityService;
    @GetMapping("/profile")
    public User getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }

        System.out.println("Authenticated User: " + userDetails.getUsername());

        return userRepository.findByEmail(userDetails.getUsername()) // Fetch by email
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
    @GetMapping("/profile/history")
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<VolunteerActivity> history = volunteerActivityService.getUserVolunteerHistory(user.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("volunteerHistory", history);

        return ResponseEntity.ok(response);
    }



    @PutMapping("/profile")
    public User updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                              @RequestBody ProfileUpdateRequest updateRequest) {
        if (userDetails == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }

        System.out.println("Authenticated User: " + userDetails.getUsername());

        // Fetch by email since authentication is based on email
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return userService.updateUserProfile(user.getId(), updateRequest);
    }

    @GetMapping("/volunteer-history")
    public ResponseEntity<List<VolunteerActivity>> getVolunteerHistory(@AuthenticationPrincipal(expression = "id") UUID userId) {
        List<VolunteerActivity> history = volunteerActivityService.getUserVolunteerHistory(userId);
        return ResponseEntity.ok(history);
    }

}
