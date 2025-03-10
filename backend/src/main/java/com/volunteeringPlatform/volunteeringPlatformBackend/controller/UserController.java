package com.volunteeringPlatform.volunteeringPlatformBackend.controller;

import com.volunteeringPlatform.volunteeringPlatformBackend.dto.ProfileUpdateRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.UserRepository;
import com.volunteeringPlatform.volunteeringPlatformBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/profile")
    public User getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }

        System.out.println("Authenticated User: " + userDetails.getUsername());

        return userRepository.findByEmail(userDetails.getUsername()) // Fetch by email
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
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

}
