# Schema Design for Smart Clinic Management System

## MySQL Database Design

The Smart Clinic Management System requires structured data for core entities like patients, doctors, appointments, and admins. These are stored in MySQL to leverage relational integrity and enforce constraints.

### Table: patients
- `id`: INT, Primary Key, AUTO_INCREMENT  
  -- Unique identifier for each patient.
- `name`: VARCHAR(100), NOT NULL  
  -- Patient's full name, required.
- `email`: VARCHAR(255), NOT NULL, UNIQUE  
  -- Email for login and communication, must be unique.
- `password`: VARCHAR(255), NOT NULL  
  -- Hashed password for secure login.
- `phone`: VARCHAR(20)  
  -- Optional phone number for contact, max length aligns with JPA validation.

### Table: doctors
- `id`: INT, Primary Key, AUTO_INCREMENT  
  -- Unique identifier for each doctor.
- `name`: VARCHAR(100), NOT NULL  
  -- Doctor's full name, required.
- `email`: VARCHAR(255), NOT NULL, UNIQUE  
  -- Email for login and communication, must be unique.
- `password`: VARCHAR(255), NOT NULL  
  -- Hashed password for secure login.
- `specialization`: VARCHAR(100)  
  -- Optional field for doctor's specialization (e.g., "Cardiology").
- `phone`: VARCHAR(20)  
  -- Optional phone number, max length aligns with JPA validation (@Pattern("\\d{10}"), @Size(max = 20)).
- `available_times`: TEXT  
  -- Stores a JSON or comma-separated list of available time slots (e.g., "2025-05-27 09:00, 2025-05-27 10:00").  
  -- Will be mapped as an @ElementCollection in the JPA Doctor model.

### Table: appointments
- `id`: INT, Primary Key, AUTO_INCREMENT  
  -- Unique identifier for each appointment.
- `doctor_id`: INT, Foreign Key → doctors(id), NOT NULL  
  -- References the doctor for this appointment.
- `patient_id`: INT, Foreign Key → patients(id), NOT NULL  
  -- References the patient for this appointment.
- `appointment_time`: DATETIME, NOT NULL  
  -- Date and time of the appointment, required.
- `status`: INT, NOT NULL, DEFAULT 0  
  -- Appointment status (0 = Scheduled, 1 = Completed, 2 = Cancelled), aligns with JPA model.
- `duration`: INT, NOT NULL, DEFAULT 60  
  -- Duration in minutes (default 1 hour).

-- Constraint: To prevent overlapping appointments, application logic should ensure that `appointment_time` and `duration` don’t overlap for the same `doctor_id`.  
-- On delete: If a patient or doctor is deleted, appointments should be cancelled (application logic) rather than cascading delete, to retain history.

### Table: admins
- `id`: INT, Primary Key, AUTO_INCREMENT  
  -- Unique identifier for each admin.
- `username`: VARCHAR(50), NOT NULL, UNIQUE  
  -- Username for login, must be unique.
- `password`: VARCHAR(255), NOT NULL  
  -- Hashed password for secure login.
- `email`: VARCHAR(255), NOT NULL, UNIQUE  
  -- Email for communication, must be unique.

## MongoDB Collection Design

The Smart Clinic Management System uses MongoDB for unstructured, flexible data like prescriptions, which may include free-form notes or nested metadata.

### Collection: prescriptions
```json
{
  "_id": "ObjectId('64abc123456')",
  "appointmentId": 51,
  "patientName": "John Smith",
  "medication": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "Every 6 hours"
    },
    {
      "name": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "Every 8 hours"
    }
  ],
  "doctorNotes": "Take after meals. Monitor for side effects.",
  "refillCount": 2,
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street"
  },
  "prescribedDate": "2025-05-26T14:42:00Z"
}
```
-- `appointmentId` references the `id` from the MySQL `appointments` table, linking the prescription to a specific appointment.  
-- `patientName` is denormalized for easier querying, but the primary link to patient data is via `appointmentId`.  
-- `medication` is an array to support multiple medications in a single prescription.  
-- `pharmacy` is an embedded document for flexibility (e.g., adding more pharmacy details later).  
-- This design supports schema evolution (e.g., adding new fields like `followUpDate`) without requiring migrations.
