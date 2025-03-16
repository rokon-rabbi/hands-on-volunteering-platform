package com.volunteeringPlatform.volunteeringPlatformBackend.controller;
import com.volunteeringPlatform.volunteeringPlatformBackend.dto.TeamCreateRequest;
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

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

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
    public ResponseEntity<Team> getTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(teamService.getTeamById(teamId));
    }

    @PostMapping("/{teamId}/join")
    public ResponseEntity<Team> joinTeam(@PathVariable Long teamId,
                                         @RequestParam UUID userId) {
        return ResponseEntity.ok(teamService.joinTeam(teamId, userId));
    }

    @GetMapping
    public ResponseEntity<Set<Team>> getAllTeams() {
        return ResponseEntity.ok(teamService.getAllTeams());
    }
}
