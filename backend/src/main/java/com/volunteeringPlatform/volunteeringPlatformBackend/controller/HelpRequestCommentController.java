package com.volunteeringPlatform.volunteeringPlatformBackend.controller;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.HelpRequestComment;
import com.volunteeringPlatform.volunteeringPlatformBackend.service.HelpRequestCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/help-requests/{helpRequestId}/comments")
@RequiredArgsConstructor
public class HelpRequestCommentController {

    @Autowired
    private HelpRequestCommentService helpRequestCommentService;

    @PostMapping
    public ResponseEntity<HelpRequestComment> addComment(
            @PathVariable UUID helpRequestId,
            @RequestBody String commentText,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(403).build();}

        String username = userDetails.getUsername();
        HelpRequestComment savedComment = helpRequestCommentService.addComment(helpRequestId, commentText, username);

        return ResponseEntity.ok(savedComment);
    }



    @GetMapping
    public ResponseEntity<List<HelpRequestComment>> getCommentsByHelpRequestId(@PathVariable UUID helpRequestId) {
        return ResponseEntity.ok(helpRequestCommentService.getCommentsByRequestId(helpRequestId));
    }
}
