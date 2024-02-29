package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.BusinessTitle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusinessTitleRepository extends JpaRepository<BusinessTitle, Long> {
    public BusinessTitle findByTitle(String title);
}
