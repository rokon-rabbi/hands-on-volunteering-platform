package com.volunteeringPlatform.volunteeringPlatformBackend.config;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.Role;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initializeSuperAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            Optional<User> superAdmin = userRepository.findByRole(Role.SUPER_ADMIN);

            if (superAdmin.isEmpty()) {
                User admin = new User();
                admin.setUsername("superadmin");
                admin.setEmail("superadmin@example.com");
                admin.setPassword(passwordEncoder.encode("superadmin"));
                admin.setRole(Role.SUPER_ADMIN);

                userRepository.save(admin);
                System.out.println("Super Admin created successfully!");
            }
        };
    }
}
