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
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            UserDetails user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid email or password.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {

        if (registerRequest.getRole() == null || registerRequest.getRole().isEmpty()) {
            registerRequest.setRole("USER");
        }

        Role role;
        try {
            role = Role.valueOf(registerRequest.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid role provided.");
        }

        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already taken.");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(role);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PutMapping("/promote")
    public ResponseEntity<String> promoteUser(@RequestParam String email, @RequestHeader("Authorization") String token) {
        String requesterUsername = jwtUtil.extractUsername(token.substring(7));
        Optional<User> requester = userRepository.findByEmail(requesterUsername);

        if (requester.isEmpty() || requester.get().getRole() != Role.SUPER_ADMIN) {
            return ResponseEntity.status(403).body("Only SUPER_ADMIN can promote users.");
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        User user = userOpt.get();
        if (user.getRole() == Role.ADMIN) {
            return ResponseEntity.badRequest().body("User is already an admin.");
        }

        user.setRole(Role.ADMIN);userRepository.save(user);

        return ResponseEntity.ok("User promoted to ADMIN.");
    }
}
