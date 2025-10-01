package com.productmanagement.service;

import com.productmanagement.model.Product;
import com.productmanagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public List<Product> getAllProductsSortedByPrice() {
        return productRepository.findAll().stream()
                .sorted((p1, p2) -> Double.compare(p1.getPrice(), p2.getPrice()))
                .toList();
    }
    
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }
    
    public Product createProduct(Product product) {
        // If image provided as base64 string, decode and store
        if (product.getImage() == null && product.getImageBase64() != null && !product.getImageBase64().isEmpty()) {
            try {
                byte[] decoded = java.util.Base64.getDecoder().decode(product.getImageBase64());
                product.setImage(decoded);
                // Default content type when unknown
                if (product.getImageContentType() == null) {
                    product.setImageContentType("image/*");
                }
            } catch (IllegalArgumentException ignored) {
                // ignore invalid base64
            }
        }
        return productRepository.save(product);
    }
    
    public Product updateProduct(String id, Product productDetails) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDetails.getName());
            product.setPrice(productDetails.getPrice());
            product.setDescription(productDetails.getDescription());
            product.setCategory(productDetails.getCategory());
            if (productDetails.getImage() != null && productDetails.getImage().length > 0) {
                product.setImage(productDetails.getImage());
                product.setImageContentType(productDetails.getImageContentType());
            }
            return productRepository.save(product);
        }
        return null;
    }
    
    public boolean deleteProduct(String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Product> searchProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }
    
    public List<Product> searchProducts(String name, String category) {
        if (name != null && !name.trim().isEmpty() && category != null && !category.trim().isEmpty()) {
            return productRepository.findByNameContainingIgnoreCaseAndCategoryIgnoreCase(name, category);
        } else if (name != null && !name.trim().isEmpty()) {
            return productRepository.findByNameContainingIgnoreCase(name);
        } else if (category != null && !category.trim().isEmpty()) {
            return productRepository.findByCategoryIgnoreCase(category);
        }
        return productRepository.findAll();
    }
}
