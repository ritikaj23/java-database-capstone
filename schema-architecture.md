# Smart Clinic Management System Architecture

## Section 1: Architecture Summary
The Smart Clinic Management System is a Spring Boot application designed with a layered architecture to handle both server-rendered dashboards and API-driven interactions. It uses Thymeleaf templates to render HTML for Admin and Doctor dashboards, while REST APIs provide JSON responses for modules like Appointments, PatientDashboard, and PatientRecord. The system integrates two databases: MySQL for structured data (e.g., patient, doctor, appointment, and admin records) and MongoDB for unstructured data (e.g., prescriptions). A centralized service layer processes business logic, interacting with MySQL via JPA repositories and MongoDB via document-based repositories, ensuring a clear separation of concerns and scalability.

## Section 2: Numbered Flow of Data and Control
1. Users interact with the system through Thymeleaf-rendered dashboards (AdminDashboard, DoctorDashboard) or REST API clients (Appointments, PatientDashboard, PatientRecord), initiating requests via browser or API calls.  
2. Requests are routed to the appropriate controller: Thymeleaf Controllers handle dashboard rendering, while REST Controllers manage API requests, processing inputs and preparing responses.  
3. Controllers delegate business logic to the Service Layer, which applies validations, enforces rules, and coordinates workflows across entities like scheduling appointments.  
4. The Service Layer interacts with the Repository Layer, using MySQL Repositories for structured data (via JPA) and MongoDB Repositories for document-based data (via Spring Data MongoDB).  
5. Repositories access their respective databases: MySQL for relational data (patients, doctors, appointments, admins) and MongoDB for flexible, unstructured data (prescriptions).  
6. Data retrieved from the databases is mapped into Java models—JPA entities for MySQL (e.g., Patient, Doctor) and document models for MongoDB (e.g., Prescription)—for use in the application.  
7. Models are utilized in the response: Thymeleaf templates render dynamic HTML for dashboards using the models, while REST responses serialize models into JSON for API clients, completing the request cycle.
