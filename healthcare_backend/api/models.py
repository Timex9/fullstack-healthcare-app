# api/models.py

from django.db import models
from django.contrib.auth.models import User

class Patient(models.Model):
    """
    Represents a patient record, created by an authenticated user.
    """
    # Link to the user who created this patient record [cite: 20]
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="patients")
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    address = models.TextField()
    contact_number = models.CharField(max_length=15)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Doctor(models.Model):
    """
    Represents a doctor record.
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name} ({self.specialization})"

class PatientDoctorMapping(models.Model):
    """
    Maps patients to doctors, representing an assignment[cite: 31].
    """
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="doctor_mappings")
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="patient_mappings")
    assigned_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Ensure a patient can only be assigned to a specific doctor once
        unique_together = ('patient', 'doctor')

    def __str__(self):
        return f"{self.patient} assigned to {self.doctor}"
