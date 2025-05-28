package com.project.backend.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend.models.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findByEmail(String email);

    Patient findByEmailOrPhone(String email, String phone);

}