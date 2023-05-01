from django.http import Http404
from django.http.response import JsonResponse
from student.serializers import StudentSerializer, RollNumberSerializer
from rest_framework import generics
import json

class StudentList(generics.ListCreateAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        with open('students.json', 'r') as f:
            students = json.load(f)
        return students

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        roll_number = serializer.validated_data['roll_number']
        with open('students.json', 'r') as f:
            students = json.load(f)
        for student in students:
            if student['email'] == email:
                return JsonResponse({"error": "Student with this email number already exists"}, status=400)
            elif student['roll_number'] == roll_number:
                return JsonResponse({"error": "Student with this roll number number already exists"}, status=400)
        student_data = serializer.validated_data
        students.append(student_data)
        with open('students.json', 'w') as f:
            json.dump(students, f)
        headers = self.get_success_headers(serializer.data)
        return JsonResponse(serializer.data, status=201, headers=headers)

def max_roll(request):
    with open('students.json', 'r') as f:
        students = json.load(f)
    return JsonResponse({"max_roll": max([st.get('roll_number') for st in students])})


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentSerializer
    lookup_field = 'roll_number'

    def get_queryset(self):
        with open('students.json', 'r') as f:
            students = json.load(f)
        return students

    def retrieve(self, request, *args, **kwargs):
        rno = kwargs['rno']
        with open('students.json', 'r') as f:
            students = json.load(f)
        for student in students:
            if (str(student['roll_number']) == str(rno)):
                serializer = self.get_serializer(student)
                return JsonResponse(serializer.data)
        return JsonResponse({"error": "Student not found"}, status=404)

    def update(self, request, *args, **kwargs):
        rno = kwargs['rno']
        with open('students.json', 'r') as f:
            students = json.load(f)
        for i, student in enumerate(students):
            if (str(student['roll_number']) == str(rno)):
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                updated_student_data = serializer.validated_data
                students[i] = updated_student_data
                with open('students.json', 'w') as f:
                    json.dump(students, f)
                return JsonResponse(serializer.data)
        return JsonResponse({"error": "Student not found"}, status=404)

    def destroy(self, request, *args, **kwargs):
        rno = kwargs['rno']
        with open('students.json', 'r') as f:
            students = json.load(f)
        for i, student in enumerate(students):
            if (str(student['roll_number']) == str(rno)):
                del students[i]
                with open('students.json', 'w') as f:
                    json.dump(students, f)
                return JsonResponse({"message": "Student deleted successfully."}, status=204)
        return JsonResponse({"error": "Student not found"}, status=404)
