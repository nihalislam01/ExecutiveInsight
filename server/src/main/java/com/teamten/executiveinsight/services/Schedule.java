package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.Users;
import com.teamten.executiveinsight.model.entity.Workspace;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class Schedule {
    private final WorkspaceService workspaceService;
    private final AttendanceService attendanceService;
    private final UserJoinWorkspaceService userJoinWorkspaceService;
    @Scheduled(cron = "0 0 0 * * *")
    public void enterAttendance() {
        List<Workspace> workspaces = workspaceService.getAllWorkspace();
        workspaces.forEach(workspace -> {
            List<Users> users = userJoinWorkspaceService.getAllUserId(workspace.getWorkspaceId());
            users.forEach(user -> {
                attendanceService.add(user, workspace);
            });
        });
    }
//    @PostConstruct
//    public void manualAttendance() {
//        List<Workspace> workspaces = workspaceService.getAllWorkspace();
//        workspaces.forEach(workspace -> {
//            List<Users> users = userJoinWorkspaceService.getAllUserId(workspace.getWorkspaceId());
//            users.forEach(user -> {
//                attendanceService.add(user, workspace);
//            });
//        });
//    }
}
