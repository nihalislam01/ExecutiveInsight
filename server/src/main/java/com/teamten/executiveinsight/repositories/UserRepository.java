package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.Users;
import com.teamten.executiveinsight.model.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    public Optional<Users> findByEmail(String email);
    @Query("SELECT u FROM Users u JOIN u.workspaces w WHERE w.code = :code AND u.userId = :id")
    public Optional<Users> findUserByWorkspaceCode(@Param("code") String code, @Param("id") Long id);
    @Query("SELECT u FROM Users u JOIN u.workspaces w WHERE w.id = :id")
    public List<Users> findUsersByWorkspaceId(@Param("id") Long id);
}
