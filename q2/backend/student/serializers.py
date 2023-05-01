from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Student
import json

class StudentSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    roll_number = serializers.IntegerField()
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=20)
    standard = serializers.IntegerField()
    father_name = serializers.CharField(max_length=50)
    mother_name = serializers.CharField(max_length=50)
    address = serializers.CharField(max_length=150)

    def create(self, validated_data):
        with open('students.json', 'r') as f:
            students = json.load(f)

        validated_data['id'] = len(students) + 1
        students.append(validated_data)

        with open('students.json', 'w') as f:
            json.dump(students, f)

        return validated_data

    def update(self, instance, validated_data):
        with open('students.json', 'r') as f:
            students = json.load(f)

        for i, student in enumerate(students):
            if student['id'] == instance.id:
                students[i] = validated_data
                break

        with open('students.json', 'w') as f:
            json.dump(students, f)

        return validated_data


class RollNumberSerializer(serializers.Serializer):
    max_roll = serializers.CharField(max_length=10)