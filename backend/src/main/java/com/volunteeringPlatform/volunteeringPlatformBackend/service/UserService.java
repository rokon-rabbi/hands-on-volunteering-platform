package com.volunteeringPlatform.volunteeringPlatformBackend.service;
import com.volunteeringPlatform.volunteeringPlatformBackend.dto.ProfileUpdateRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.dto.RegisterRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.Role;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.UserRepository;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.VolunteerActivityRepository;
import com.volunteeringPlatform.volunteeringPlatformBackend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    public VolunteerActivityRepository volunteerActivityRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new IllegalStateException("Username already taken");
        }
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new IllegalStateException("Email already taken");
        }

        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        Role role = Role.USER;
        if (registerRequest.getRole() != null && !registerRequest.getRole().isEmpty()) {
            try {
                role = Role.valueOf(registerRequest.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid role provided. Allowed: USER, ADMIN, SUPER_ADMIN");
            }
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(encodedPassword);
        user.setSkills(registerRequest.getSkills());
        user.setCauses(registerRequest.getCauses());
        user.setRole(role);

        return userRepository.save(user);
    }

    public User updateUserProfile(UUID userId, ProfileUpdateRequest updateRequest) {
        return userRepository.findById(userId).map(user -> {
            if (updateRequest.getUsername() != null && !updateRequest.getUsername().isEmpty()) {
                user.setUsername(updateRequest.getUsername());
            }
            if (updateRequest.getEmail() != null && !updateRequest.getEmail().isEmpty()) {
                user.setEmail(updateRequest.getEmail());
            }
            if (updateRequest.getSkills() != null) {
                user.setSkills(updateRequest.getSkills());
            }
            if (updateRequest.getCauses() != null) {
                user.setCauses(updateRequest.getCauses());
            }
            return userRepository.save(user);
        }).orElseThrow(() -> new IllegalStateException("User not found"));
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found for email: " + email));
    }
    public String getUsernameFromToken(String token) {
        return jwtUtil.extractUsername(token.replace("Bearer ", ""));
    }

}
