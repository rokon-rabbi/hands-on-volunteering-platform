package com.volunteeringPlatform.volunteeringPlatformBackend.repository;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.HelpRequestComment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface HelpRequestCommentRepository extends JpaRepository<HelpRequestComment, UUID> {
    List<HelpRequestComment> findByHelpRequestId(UUID helpRequestId);
}

