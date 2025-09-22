# api/views.py

from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import Patient, Doctor, PatientDoctorMapping
from .serializers import (
    UserRegistrationSerializer,
    PatientSerializer,
    DoctorSerializer,
    PatientDoctorMappingSerializer
)

class UserRegistrationView(generics.CreateAPIView):
    """
    API view for user registration.
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny] # Anyone can register

class PatientViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing patient records.
    Authenticated users can only view and manage their own patient records.
    """
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter patients to only those created by the currently logged-in user
        return Patient.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the logged-in user as the creator of the patient
        serializer.save(created_by=self.request.user)

class DoctorViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing doctor records.
    GET requests are public.
    POST, PUT, DELETE requests require authentication.
    """
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def get_permissions(self):
        # Allow anyone to view doctors (GET)
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [permissions.AllowAny]
        # But only authenticated users can create, update, or delete them
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

class PatientDoctorMappingViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing patient-doctor mappings.
    """
    queryset = PatientDoctorMapping.objects.all()
    serializer_class = PatientDoctorMappingSerializer
    permission_classes = [permissions.IsAuthenticated]

    # This handles the custom API: GET /api/mappings/<patient_id>/
    @action(detail=False, methods=['get'], url_path=r'patient/(?P<patient_id>\d+)')
    def get_doctors_for_patient(self, request, patient_id=None):
        try:
            # Check if the patient exists and belongs to the user
            patient = Patient.objects.get(id=patient_id, created_by=request.user)
            mappings = self.get_queryset().filter(patient=patient)
            serializer = self.get_serializer(mappings, many=True)
            return Response(serializer.data)
        except Patient.DoesNotExist:
            return Response(
                {"error": "Patient not found or you do not have permission to view."},
                status=status.HTTP_404_NOT_FOUND
            )
