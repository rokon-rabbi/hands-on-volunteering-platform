package com.volunteeringPlatform.volunteeringPlatformBackend.controller;
import com.volunteeringPlatform.volunteeringPlatformBackend.dto.TeamCreateRequest;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.Privacy;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.Team;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.service.TeamService;
import com.volunteeringPlatform.volunteeringPlatformBackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamController {
    @Autowired
    private UserService userService;
    private final TeamService teamService;

    @PostMapping
    public ResponseEntity<?> createTeam(@RequestBody TeamCreateRequest request,
                                        @AuthenticationPrincipal UserDetails userDetails) {


        String creator = userDetails.getUsername();
        Team team = teamService.createTeam(request.getName(), request.getPrivacy(), creator);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Team created successfully");
        response.put("teamId", team.getId());
        response.put("teamName", team.getName());
        response.put("privacy", team.getPrivacy());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{teamId}")
    public ResponseEntity<?> getTeam(@PathVariable Long teamId) {
        Team team = teamService.getTeamById(teamId);

        Map<String, Object> teamResponse = new HashMap<>();
        teamResponse.put("id", team.getId());
        teamResponse.put("name", team.getName());
        teamResponse.put("privacy", team.getPrivacy());
        teamResponse.put("createdAt", team.getCreatedAt());

        List<Map<String, Object>> filteredMembers = team.getMembers().stream().map(member -> {
            Map<String, Object> memberResponse = new HashMap<>();
            memberResponse.put("id", member.getId());
            memberResponse.put("username", member.getUsername());
            return memberResponse;
        }).toList();

        teamResponse.put("members", filteredMembers);

        return ResponseEntity.ok(teamResponse);
    }


    @PostMapping("/{teamId}/join")
    public ResponseEntity<?> joinTeam(@PathVariable Long teamId,
                                      @AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();
        User user = userService.getUserByEmail(username);

        Team team = teamService.getTeamById(teamId);
        if (team.getPrivacy() == Privacy.PUBLIC) {
            team = teamService.joinTeam(teamId, user.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "User joined team successfully");
            response.put("teamId", team.getId());
            response.put("teamName", team.getName());
            response.put("privacy", team.getPrivacy());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "This is a private team. You need an invitation to join."));
        }
    }


    @GetMapping
    public ResponseEntity<?> getAllTeams() {
        Set<Team> teams = teamService.getAllTeams();

        List<Map<String, Object>> filteredTeams = teams.stream().map(team -> {
            Map<String, Object> teamResponse = new HashMap<>();
            teamResponse.put("id", team.getId());
            teamResponse.put("name", team.getName());
            teamResponse.put("privacy", team.getPrivacy());
            teamResponse.put("createdAt", team.getCreatedAt());

            List<Map<String, Object>> filteredMembers = team.getMembers().stream().map(member -> {
                Map<String, Object> memberResponse = new HashMap<>();
                memberResponse.put("id", member.getId());
                memberResponse.put("username", member.getUsername());
                return memberResponse;
            }).toList();

            teamResponse.put("members", filteredMembers);

            return teamResponse;
        }).toList();

        return ResponseEntity.ok(filteredTeams);
    }

}
