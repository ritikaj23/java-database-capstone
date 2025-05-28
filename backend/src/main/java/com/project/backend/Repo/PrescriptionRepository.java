package com.project.backend.repo;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project.backend.models.Prescription;

public interface PrescriptionRepository extends MongoRepository<Prescription, String> {
    
    List<Prescription> findByAppointmentId(Long appointmentId);
}
