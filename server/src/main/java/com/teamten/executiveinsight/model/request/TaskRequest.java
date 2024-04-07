package com.teamten.executiveinsight.model.request;

public record TaskRequest(Long workspaceId, Long productId, Long taskId, String name, String description,String startDate, String endDate, int quantity, int value) {
}
