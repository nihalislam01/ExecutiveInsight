package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.BusinessTitle;
import com.teamten.executiveinsight.model.Post;
import com.teamten.executiveinsight.repositories.BusinessTitleRepository;
import com.teamten.executiveinsight.repositories.PostRepository;
import com.teamten.executiveinsight.repositories.WorkspaceRepository;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseInitializer {
    private final BusinessTitleRepository businessTitleRepository;
    private final PostRepository postRepository;
    @PostConstruct
    public void init() {
        businessTitleRepository.save(new BusinessTitle("Manufacturing Company"));
        businessTitleRepository.save(new BusinessTitle("Retail Chain"));
        businessTitleRepository.save(new BusinessTitle("IT Service Company"));
        businessTitleRepository.save(new BusinessTitle("Restaurant"));
        businessTitleRepository.save(new BusinessTitle("Hospitality"));
        businessTitleRepository.save(new BusinessTitle("Healthcare Provider"));
        businessTitleRepository.save(new BusinessTitle("Financial Service Firm"));
        businessTitleRepository.save(new BusinessTitle("Real Estate Agency"));
        businessTitleRepository.save(new BusinessTitle("Construction Company"));
        businessTitleRepository.save(new BusinessTitle("Consulting Firm"));

        postRepository.save(new Post("Production Supervisor", businessTitleRepository.findById(1L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Mechanical Engineer", businessTitleRepository.findById(1L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Quality Control Inspector", businessTitleRepository.findById(1L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Manufacturing Technician", businessTitleRepository.findById(1L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Store Manager", businessTitleRepository.findById(2L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Sales Associate", businessTitleRepository.findById(2L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Merchandiser", businessTitleRepository.findById(2L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Customer Service Representative", businessTitleRepository.findById(2L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Software Developer", businessTitleRepository.findById(3L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("IT Project Manager", businessTitleRepository.findById(3L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Systems Administrator", businessTitleRepository.findById(3L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Cyber Security Analyst", businessTitleRepository.findById(3L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Head Chef", businessTitleRepository.findById(4L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Waiter", businessTitleRepository.findById(4L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Bartender", businessTitleRepository.findById(4L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Restaurant Manager", businessTitleRepository.findById(4L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Hotel General Manager", businessTitleRepository.findById(5L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Front Desk Receptionist", businessTitleRepository.findById(5L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Chef de Cuisine", businessTitleRepository.findById(5L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Events Coordinator", businessTitleRepository.findById(5L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Registered Nurse (RN)", businessTitleRepository.findById(6L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Medical Laboratory Technologist", businessTitleRepository.findById(6L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Physician Assistant", businessTitleRepository.findById(6L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Medical Billing Specialist", businessTitleRepository.findById(6L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Financial Analyst", businessTitleRepository.findById(7L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Investment Advisor", businessTitleRepository.findById(7L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Risk Manager", businessTitleRepository.findById(7L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Accountant", businessTitleRepository.findById(7L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Real Estate Agent", businessTitleRepository.findById(8L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Property Manager", businessTitleRepository.findById(8L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Mortgage Loan Officer", businessTitleRepository.findById(8L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Real Estate Appraiser", businessTitleRepository.findById(8L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Project Manager", businessTitleRepository.findById(9L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Construction Superintendent", businessTitleRepository.findById(9L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Civil Engineer", businessTitleRepository.findById(9L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Construction Estimator", businessTitleRepository.findById(9L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Management Consultant", businessTitleRepository.findById(10L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("IT Consultant", businessTitleRepository.findById(10L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Financial Consultant", businessTitleRepository.findById(10L).orElseThrow(EntityExistsException::new)));
        postRepository.save(new Post("Human Resources Consultant", businessTitleRepository.findById(10L).orElseThrow(EntityExistsException::new)));



    }
}
