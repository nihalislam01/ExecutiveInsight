package com.teamten.executiveinsight.controllers;

import com.teamten.executiveinsight.model.entity.Product;
import com.teamten.executiveinsight.model.entity.Workspace;
import com.teamten.executiveinsight.model.request.ProductRequest;
import com.teamten.executiveinsight.services.ProductService;
import com.teamten.executiveinsight.services.WorkspaceService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final WorkspaceService workspaceService;
    @PostMapping("/create-product")
    public ResponseEntity<String> addProduct(@RequestBody ProductRequest productRequest) {
        if (productRequest.name().equalsIgnoreCase("") || productRequest.name().equalsIgnoreCase(" ")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Please enter your product name");
        }
        Workspace workspace = workspaceService.getWorkspace(productRequest.id()).orElseThrow(EntityNotFoundException::new);
        productService.createProduct(productRequest.name(), workspace);
        return ResponseEntity.ok("Product Created Successfully");
    }
    @GetMapping("/get-products/{id}")
    public ResponseEntity<?> getAllProduct(@PathVariable Long id) {
        List<Product> products = productService.getAllProduct(id);
        return ResponseEntity.ok(products);
    }
    @PatchMapping("/change-product-name")
    public ResponseEntity<String> updateProduct(@RequestBody ProductRequest productRequest) {
        if (productRequest.name().equalsIgnoreCase("") || productRequest.name().equalsIgnoreCase(" ")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Please enter your product name");
        }
        if (productService.updateProduct(productRequest)) {
            return ResponseEntity.ok("Product name changed");
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("You entered the same product name");
    }
    @DeleteMapping("/delete-product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.removeProduct(id);
        return ResponseEntity.ok("Product Removed Successfully");
    }
}
