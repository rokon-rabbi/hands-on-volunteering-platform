package com.volunteeringPlatform.volunteeringPlatformBackend.repository;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);
}