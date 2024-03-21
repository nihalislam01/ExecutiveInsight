package com.teamten.executiveinsight.repositories;

import com.teamten.executiveinsight.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByWorkspace_workspaceId(Long id);
}
