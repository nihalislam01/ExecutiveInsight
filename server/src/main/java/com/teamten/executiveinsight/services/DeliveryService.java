package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.Delivery;
import com.teamten.executiveinsight.model.entity.Task;
import com.teamten.executiveinsight.model.entity.Workspace;
import com.teamten.executiveinsight.model.request.DeliveryRequest;
import com.teamten.executiveinsight.repositories.DeliveryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeliveryService {
    private final DeliveryRepository deliveryRepository;
    public void addDelivery(DeliveryRequest deliveryRequest, Task task, Workspace workspace) {
        Delivery newDelivery = new Delivery();
        newDelivery.setDescription(deliveryRequest.description());
        newDelivery.setReceipt(deliveryRequest.receipt());
        newDelivery.setTask(task);
        newDelivery.setWorkspace(workspace);
        newDelivery.setSubmitted(false);
        deliveryRepository.save(newDelivery);
    }
    public List<Delivery> getAllDelivery(Long id) {
        return deliveryRepository.findAllByWorkspace_workspaceId(id);
    }
    public Delivery getDelivery(Long id) {
        return deliveryRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public void updateDelivery(Delivery delivery) {
        deliveryRepository.save(delivery);
    }

    public void removeDelivery(Delivery delivery) {
        deliveryRepository.delete(delivery);
    }
}
