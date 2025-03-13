package com.volunteeringPlatform.volunteeringPlatformBackend.service;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.HelpRequestComment;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.HelpRequestCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HelpRequestCommentService {

    private final HelpRequestCommentRepository helpRequestCommentRepository;

    public HelpRequestComment addComment(UUID helpRequestId, String commentText, String userId) {
        HelpRequestComment comment = HelpRequestComment.builder()
                .helpRequestId(helpRequestId)
                .userId(userId)
                .comment(commentText)
                .build();
        return helpRequestCommentRepository.save(comment);
    }


    public List<HelpRequestComment> getCommentsByRequestId(UUID helpRequestId) {
        return helpRequestCommentRepository.findByHelpRequestId(helpRequestId);
    }
}
