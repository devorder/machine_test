from django.urls import path
from .views import StudentList, StudentDetail, max_roll

urlpatterns = [
    path('', StudentList.as_view(), name='student-list'),
    path('students/', StudentList.as_view(), name='student-list'),
    path('students/<rno>/', StudentDetail.as_view(), name='student-detail'),
    path('max_roll/', max_roll, name='roll-number'),
]