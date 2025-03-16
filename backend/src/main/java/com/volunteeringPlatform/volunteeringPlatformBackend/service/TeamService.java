package com.volunteeringPlatform.volunteeringPlatformBackend.service;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.Privacy;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.Team;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.TeamRepository;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public Team createTeam(String name, String privacy, String creatorId) {

        Set<User> members = new HashSet<>();

        User creator = userService.getUserByEmail(creatorId);
        members.add(creator);

        Team team = new Team();
        team.setName(name);
        team.setPrivacy(Privacy.valueOf(privacy.toUpperCase()));
        team.setMembers(members);
        team.setCreatedAt(LocalDateTime.now());

        return teamRepository.save(team);
    }


    public Team getTeamById(Long teamId) {
        return teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));
    }

    @Transactional
    public Team joinTeam(Long teamId, UUID userId) {
        Team team = getTeamById(teamId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        team.getMembers().add(user);
        return team;
    }

    public Set<Team> getAllTeams() {
        return Set.copyOf(teamRepository.findAll());
    }
}
