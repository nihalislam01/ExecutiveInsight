package com.teamten.executiveinsight.services;

import com.teamten.executiveinsight.model.entity.Product;
import com.teamten.executiveinsight.model.entity.Workspace;
import com.teamten.executiveinsight.model.request.ProductRequest;
import com.teamten.executiveinsight.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    public void createProduct(String name, Workspace workspace) {
        Product newProduct = new Product();
        newProduct.setName(name);
        newProduct.setWorkspace(workspace);
        productRepository.save(newProduct);
    }
    public List<Product> getAllProduct(Long id) {
        return productRepository.findAllByWorkspace_workspaceId(id);
    }
    public boolean updateProduct(ProductRequest productRequest) {
        Product product = productRepository.findById(productRequest.id()).orElseThrow(EntityNotFoundException::new);
        if (product.getName().equalsIgnoreCase(productRequest.name())) {
            return false;
        }
        product.setName(productRequest.name());
        productRepository.save(product);
        return true;
    }
    public void removeProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        productRepository.delete(product);
    }

    public Optional<Product> getProduct(Long id) {
        return productRepository.findById(id);
    }
}
