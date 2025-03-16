package com.volunteeringPlatform.volunteeringPlatformBackend.service;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.HelpRequestComment;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.HelpRequestCommentRepository;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HelpRequestCommentService {
    @Autowired
    private UserRepository userRepository;
    private final HelpRequestCommentRepository helpRequestCommentRepository;

    public HelpRequestComment addComment(UUID helpRequestId, String commentText, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        HelpRequestComment comment = HelpRequestComment.builder()
                .helpRequestId(helpRequestId)
                .userId(user.getId())
                .username(user.getUsername())
                .comment(commentText)
                .build();

        return helpRequestCommentRepository.save(comment);
    }




    public List<HelpRequestComment> getCommentsByRequestId(UUID helpRequestId) {
        return helpRequestCommentRepository.findByHelpRequestId(helpRequestId);
    }
}
