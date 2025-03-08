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

        if (registerRequest.getRole() == null || registerRequest.getRole().isEmpty()) {
            registerRequest.setRole("USER");
        }
        Role role;
        try {
            role = Role.valueOf(registerRequest.getRole().toUpperCase());  // Convert role string to enum
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body("Invalid role provided.");}

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(role);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

}
