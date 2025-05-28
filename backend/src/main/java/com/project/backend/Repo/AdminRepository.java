package com.project.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.models.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Admin findByUsername(String username);
}