package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.Attendance;
import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.entity.Workspace;
import com.teamten.executiveinsight.repositories.AttendanceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    public void add(Users user, Workspace workspace) {
        Attendance attendance = new Attendance();
        attendance.setUser(user);
        attendance.setDay(LocalDate.now().getDayOfWeek());
        attendance.setDate(LocalDate.now());
        attendance.setWorkspace(workspace);
        attendance.setAttended(false);
        attendanceRepository.save(attendance);
    }
    public void checkIn(Long id) {
        Attendance record = attendanceRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        record.setAttended(true);
        record.setCheckInTime(LocalDateTime.now());
        attendanceRepository.save(record);
    }
    public void checkOut(Long id) {
        Attendance record = attendanceRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        record.setCheckOutTime(LocalDateTime.now());
        attendanceRepository.save(record);
    }
    public Attendance getAttendanceByUser(String email, Long id) {
        return attendanceRepository.findTopByUser_emailAndWorkspace_workspaceIdOrderByAttendanceIdDesc(email, id);
    }
    public List<Attendance> getAttendanceByWorkspace(Long workspaceId) {
        return attendanceRepository.findByWorkspace_workspaceId(workspaceId);
    }
}
