from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('calculate/', views.calculate_sum, name='calculate_sum'),
]
