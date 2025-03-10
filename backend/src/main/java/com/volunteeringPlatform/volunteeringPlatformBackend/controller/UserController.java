package com.volunteeringPlatform.volunteeringPlatformBackend.controller;

import com.volunteeringPlatform.volunteeringPlatformBackend.dto.ProfileUpdateRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
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

    @PutMapping("/profile")
    public User updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                              @RequestBody ProfileUpdateRequest updateRequest) {
        if (userDetails == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }

        System.out.println("Authenticated User: " + userDetails.getUsername());

        User user = userService.getUserByUsername(userDetails.getUsername());

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        return userService.updateUserProfile(user.getId(), updateRequest);
    }


}
