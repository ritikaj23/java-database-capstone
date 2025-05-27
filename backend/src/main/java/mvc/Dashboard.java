package com.project.backend.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashMap;
import java.util.Map;

@Controller
public class Dashboard {

    // Autowire the service for token validation (assumed to exist)
    @Autowired
    private Service tokenValidationService;

    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        // Validate token for admin role
        Map<String, Object> validationResult = tokenValidationService.validateToken(token, "admin");

        // If validationResult is empty, token is valid; render the admin dashboard
        if (validationResult.isEmpty()) {
            return "admin/adminDashboard";
        } else {
            // If token is invalid, redirect to login page
            return "redirect:http://localhost:8080";
        }
    }

    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        // Validate token for doctor role
        Map<String, Object> validationResult = tokenValidationService.validateToken(token, "doctor");

        // If validationResult is empty, token is valid; render the doctor dashboard
        if (validationResult.isEmpty()) {
            return "doctor/doctorDashboard";
        } else {
            // If token is invalid, redirect to login page
            return "redirect:http://localhost:8080";
        }
    }

    // Mock Service class for token validation (since the actual Service isn't provided)
    public static class Service {
        public Map<String, Object> validateToken(String token, String role) {
            // Mock implementation: return empty map for valid token, non-empty for invalid
            // In a real app, this would verify the token against a database or auth service
            if (token != null && !token.isEmpty() && (role.equals("admin") || role.equals("doctor"))) {
                return new HashMap<>(); // Valid token
            } else {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Invalid token or role");
                return error; // Invalid token
            }
        }
    }
}