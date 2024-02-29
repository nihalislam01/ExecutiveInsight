package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.BusinessTitle;
import com.teamten.executiveinsight.repositories.BusinessTitleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseInitializer {
    private final BusinessTitleRepository businessTitleRepository;
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
    }
}
