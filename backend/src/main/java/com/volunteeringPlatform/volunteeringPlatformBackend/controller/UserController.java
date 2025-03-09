package com.volunteeringPlatform.volunteeringPlatformBackend.controller;

import com.volunteeringPlatform.volunteeringPlatformBackend.dto.ProfileUpdateRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/profile")
    public User updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                              @RequestBody ProfileUpdateRequest updateRequest) {
        return userService.updateUserProfile(UUID.fromString(userDetails.getUsername()), updateRequest);
    }
}
