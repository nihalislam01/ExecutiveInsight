package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.BusinessTitle;
import com.teamten.executiveinsight.repositories.BusinessTitleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessTitleService {
    private final BusinessTitleRepository businessTitleRepository;
    public List<BusinessTitle> getAllTitle() {
        return businessTitleRepository.findAll();
    }

    public BusinessTitle getTitle(String title) {
        return businessTitleRepository.findByTitle(title);
    }
}
