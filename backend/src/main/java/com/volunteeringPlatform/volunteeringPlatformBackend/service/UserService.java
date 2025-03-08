package com.volunteeringPlatform.volunteeringPlatformBackend.service;
import com.volunteeringPlatform.volunteeringPlatformBackend.dto.RegisterRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.Role;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service public class UserService {

    @Autowired
    private UserRepository userRepository;

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
        if (registerRequest.getRole() != null && !registerRequest.getRole().isEmpty()) try {
                role = Role.valueOf(registerRequest.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid role provided. Allowed: USER, ADMIN, SUPER_ADMIN");
            }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(encodedPassword);
        user.setSkills(registerRequest.getSkills());
        user.setCauses(registerRequest.getCauses());
        user.setRole(role);
        return userRepository.save(user);}}
