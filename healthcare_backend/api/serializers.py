# api/serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Patient, Doctor, PatientDoctorMapping

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class DoctorSerializer(serializers.ModelSerializer):
    """
    Serializer for the Doctor model.
    """
    class Meta:
        model = Doctor
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    """
    Serializer for the Patient model.
    """
    # created_by is set automatically in the view, so it's read-only here.
    created_by = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = Patient
        fields = '__all__'

class PatientDoctorMappingSerializer(serializers.ModelSerializer):
    """
    Serializer for mapping patients to doctors.
    """
    # Displaying names instead of just IDs for better readability in the API
    patient_name = serializers.CharField(source='patient.__str__', read_only=True)
    doctor_name = serializers.CharField(source='doctor.__str__', read_only=True)
    
    class Meta:
        model = PatientDoctorMapping
        fields = ('id', 'patient', 'doctor', 'patient_name', 'doctor_name', 'assigned_on')
