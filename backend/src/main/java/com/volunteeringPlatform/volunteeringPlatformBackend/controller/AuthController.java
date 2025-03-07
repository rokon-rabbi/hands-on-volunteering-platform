package com.volunteeringPlatform.volunteeringPlatformBackend.controller;
import com.volunteeringPlatform.volunteeringPlatformBackend.dto.AuthRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.dto.AuthResponse;
import com.volunteeringPlatform.volunteeringPlatformBackend.dto.RegisterRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.Role;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.UserRepository;
import com.volunteeringPlatform.volunteeringPlatformBackend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        UserDetails user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        // Check if the role is null or empty, if so set to default role
        if (registerRequest.getRole() == null || registerRequest.getRole().isEmpty()) {
            registerRequest.setRole("USER");  // Default to USER if no role is provided
        }

        // Convert role from String to Role enum
        Role role;
        try {
            role = Role.valueOf(registerRequest.getRole().toUpperCase());  // Convert role string to enum
        } catch (IllegalArgumentException e) {
            // Handle invalid role if the provided role doesn't match any enum
            return ResponseEntity.badRequest().body("Invalid role provided.");
        }

        // Create and populate the User object
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Encrypt password
        user.setRole(role);  // Set role

        // Save the user
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

}