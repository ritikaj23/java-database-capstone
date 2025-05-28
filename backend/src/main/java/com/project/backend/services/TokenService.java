package com.project.backend.services;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.project.backend.models.Admin;
import com.project.backend.models.Doctor;
import com.project.backend.models.Patient;
import com.project.backend.repo.AdminRepository;
import com.project.backend.repo.DoctorRepository;
import com.project.backend.repo.PatientRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class TokenService {

    @Value("${jwt.secret}")
    private String secret;

    private final AdminRepository adminRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    public TokenService(AdminRepository adminRepository,DoctorRepository doctorRepository,PatientRepository patientRepository) {
        this.adminRepository=adminRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository=patientRepository;
    }

    // Return type changed to SecretKey to fix verifyWith(...) issue
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 7))
                .signWith(getSigningKey()) // clean & modern
                .compact();
    }    

    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey()) // No more error now
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token,String user) {
        try {
            String extracted = extractEmail(token);
            if(user.equals("admin"))
            {
                Admin admin =adminRepository.findByUsername(extracted);
                if(admin!=null)
                {
                    return true;
                }
            }
            else if(user.equals("doctor"))
            {
                Doctor doctor=doctorRepository.findByEmail(extracted);
                if(doctor!=null)
                {
                    return true;
                }
            }
            else if(user.equals("patient"))
            {
                Patient patient=patientRepository.findByEmail(extracted);
                if(patient!=null)
                {
                    return true;
                }
            }

            return false;
        } catch (Exception e) {
            return false;
        }
    }

   
}