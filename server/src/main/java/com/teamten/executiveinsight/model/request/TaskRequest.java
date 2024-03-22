package com.teamten.executiveinsight.model.request;

public record TaskRequest(Long workspaceId, Long productId, Long taskId, String name, String description, String endDate, String quantity) {
}
