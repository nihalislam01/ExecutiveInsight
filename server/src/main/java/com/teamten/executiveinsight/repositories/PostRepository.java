package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByTitle(String title);
    @Query("SELECT p FROM Post p JOIN p.workspaces w WHERE w.workspaceId = :id AND p.title = :title")
    Optional<Post> findByTitleAndWorkspaceId(@Param("title") String title, @Param("id") Long id);
}
