package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.entity.Attendance;
import com.teamten.executiveinsight.services.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;
    @PutMapping("/check-in/{id}")
    private ResponseEntity<String> checkIn(@PathVariable Long id) {
        attendanceService.checkIn(id);
        return ResponseEntity.ok("Checked In Successfully");
    }
    @PutMapping("/check-out/{id}")
    private ResponseEntity<String> checkOut(@PathVariable Long id) {
        attendanceService.checkOut(id);
        return ResponseEntity.ok("Checked Out Successfully");
    }
    @GetMapping("/get-attendance-by-workspace/{workspaceId}")
    private ResponseEntity<?> getAttendancesByWorkspace(@PathVariable Long workspaceId) {
        List<Attendance> attendances = attendanceService.getAttendanceByWorkspace(workspaceId);
        return ResponseEntity.ok(attendances);
    }
    @GetMapping("/get-attendance-by-user/{email}/{id}")
    private ResponseEntity<Attendance> getAttendancesByUser(@PathVariable String email, @PathVariable Long id) {
        Attendance attendance = attendanceService.getAttendanceByUser(email, id);
        return ResponseEntity.ok(attendance);
    }
}
