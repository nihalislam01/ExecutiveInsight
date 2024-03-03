package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.BusinessTitle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessTitleRepository extends JpaRepository<BusinessTitle, Long> {
    BusinessTitle findByTitle(String title);
}
