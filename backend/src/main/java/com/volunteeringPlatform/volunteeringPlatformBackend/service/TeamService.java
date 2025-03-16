package com.volunteeringPlatform.volunteeringPlatformBackend.service;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.Team;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.TeamRepository;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new team
    public Team createTeam(Team team, User user) {
        // Make the user the first member of the team
        team.getMembers().add(user);
        return teamRepository.save(team);
    }

    // Get details of a team
    public Team getTeamDetails(Long teamId) {
        return teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team not found"));
    }

    // Add a member to the team
    public Team addMemberToTeam(Long teamId, User user) {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team not found"));
        team.getMembers().add(user);
        return teamRepository.save(team);
    }

    // Get all teams (for leaderboard)
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }
}
