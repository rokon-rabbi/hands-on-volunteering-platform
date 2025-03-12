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

import java.util.*;

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
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", user.getId());
        userInfo.put("username", user.getUsername());
        userInfo.put("email", user.getEmail());
        userInfo.put("role", user.getRole());
        userInfo.put("skills", user.getSkills());
        userInfo.put("causes", user.getCauses());

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/profile/history")
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        List<VolunteerActivity> history = volunteerActivityService.getUserVolunteerHistory(user.getId());

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> userData = new HashMap<>();
        userData.put("userId", user.getId());
        userData.put("username", user.getUsername());
        userData.put("email", user.getEmail());
        userData.put("role", user.getRole());
        userData.put("skills", user.getSkills());
        userData.put("causes", user.getCauses());

        response.put("user", userData);

        List<Map<String, Object>> sanitizedHistory = new ArrayList<>();
        for (VolunteerActivity activity : history) {
            Map<String, Object> sanitizedActivity = new HashMap<>();
            sanitizedActivity.put("id", activity.getId());
            sanitizedActivity.put("cause", activity.getCause());
            sanitizedActivity.put("description", activity.getDescription());
            sanitizedActivity.put("dateParticipated", activity.getDateParticipated());

            Map<String, Object> sanitizedUser = new HashMap<>();
            sanitizedUser.put("userId", activity.getUser().getId());
            sanitizedUser.put("username", activity.getUser().getUsername());
            sanitizedUser.put("email", activity.getUser().getEmail());
            sanitizedUser.put("role", activity.getUser().getRole());
            sanitizedUser.put("skills", activity.getUser().getSkills());
            sanitizedUser.put("causes", activity.getUser().getCauses());

            sanitizedActivity.put("user", sanitizedUser);

            sanitizedHistory.add(sanitizedActivity);
        }

        response.put("volunteerHistory", sanitizedHistory);

        return ResponseEntity.ok(response);
    }





    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ProfileUpdateRequest updateRequest) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        User updatedUser = userService.updateUserProfile(user.getId(), updateRequest);
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", updatedUser.getId());
        userInfo.put("username", updatedUser.getUsername());
        userInfo.put("email", updatedUser.getEmail());
        userInfo.put("role", updatedUser.getRole());
        userInfo.put("skills", updatedUser.getSkills());
        userInfo.put("causes", updatedUser.getCauses());

        return ResponseEntity.ok(userInfo);
    }



}
