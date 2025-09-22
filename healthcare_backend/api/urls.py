# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'patients', views.PatientViewSet, basename='patient')
router.register(r'doctors', views.DoctorViewSet, basename='doctor')
router.register(r'mappings', views.PatientDoctorMappingViewSet, basename='mapping')

# The API URLs are now determined automatically by the router.
# Additionally, we include the URL for the user registration endpoint.
urlpatterns = [
    path('auth/register/', views.UserRegistrationView.as_view(), name='register'),
    path('', include(router.urls)),
]
