# Doctor-Patient Management System

## Overview

This project is a **Doctor-Patient Management System** built using **Node.js, Express.js, Sequelize (with PostgreSQL), and JWT Authentication**. The system allows users to create and manage doctors, patients, and mappings between them while enforcing authentication and authorization.

## Features

- **User Authentication & Authorization**

  - JWT-based authentication.
  - Protected routes requiring authentication.

- **Doctor Management**

  - Create, update, delete, and fetch doctors.
  - Restrict operations to the user who created the doctor.

- **Patient Management**

  - Create, update, delete, and fetch patients.
  - Restrict operations to the user who created the patient.

- **Doctor-Patient Mapping**

  - Assign doctors to patients (both created by same user).
  - Fetch doctors assigned to a patient.
  - Fetch all mappings for the logged-in user.
  - Remove a particular doctor from a particular patient.
  - Restrict operations to the user who created the mapping.

## API Endpoints

### **Authentication**

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| `POST` | `/api/register`      | Register a new user     |
| `POST` | `/api/login`         | Login and get JWT token |

### **Doctor Management**

| Method   | Endpoint           | Description                             |
| -------- | ------------------ | --------------------------------------- |
| `POST`   | `/api/doctors`     | Create a new doctor (Authenticated)     |
| `GET`    | `/api/doctors`     | Get all doctors created by the user     |
| `GET`    | `/api/doctors/:id` | Get a specific doctor (Created by user) |
| `PUT`    | `/api/doctors/:id` | Update a doctor (Created by user)       |
| `DELETE` | `/api/doctors/:id` | Delete a doctor (Created by user)       |

### **Patient Management**

| Method   | Endpoint            | Description                              |
| -------- | ------------------- | ---------------------------------------- |
| `POST`   | `/api/patients`     | Create a new patient (Authenticated)     |
| `GET`    | `/api/patients`     | Get all patients created by the user     |
| `GET`    | `/api/patients/:id` | Get a specific patient (Created by user) |
| `PUT`    | `/api/patients/:id` | Update a patient (Created by user)       |
| `DELETE` | `/api/patients/:id` | Delete a patient (Created by user)       |

### **Doctor-Patient Mapping**

| Method   | Endpoint                                            | Description                                |
| -------- | --------------------------------------------------- | ------------------------------------------ |
| `POST`   | `/api/mappings`                                     | Assign a doctor to a patient               |
| `GET`    | `/api/mappings`                                     | Get all mappings created by the user       |
| `GET`    | `/api/mappings/patient/:id`                         | Get doctors assigned to a specific patient |
| `DELETE` | `/api/mappings/patient/:patientId/doctor/:doctorId` | Remove a doctor from a patient             |

## Error Handling

- Unauthorized access returns `401 Unauthorized`.
- Forbidden access to another user's data returns `403 Forbidden`.
- Invalid requests return `400 Bad Request`.
- Server errors return `500 Internal Server Error`.

##

