package com.teamten.executiveinsight.model.request;

public record DeliveryRequest(String description, String receipt, Long taskId, Long workspaceId) {
}
