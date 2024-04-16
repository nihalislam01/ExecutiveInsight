package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByWorkspace_workspaceId(Long workspaceId);
    Attendance findTopByUser_emailOrderByAttendanceIdDesc(String email);
}
