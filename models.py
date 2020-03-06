from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Assignment(models.Model):
    GROUP_1 = "g1"
    GROUP_2 = "g2"
    GROUP_3 = "g3"

    tek_choices = [
        (GROUP_1, "Group 1"),
        (GROUP_2, "Group 2"),
        (GROUP_3, "Group 3")
    ]
    
    group = models.ForeignKey('groups.Group', on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=30)
    tek_choice = models.CharField(max_length=2, choices=tek_choices, default=GROUP_1)

class Grade(models.Model):
    student = models.ForeignKey('groups.Student', on_delete=models.SET_NULL, null=True)
    group = models.ForeignKey('groups.Group', on_delete=models.SET_NULL, null=True)
    assignment = models.ForeignKey(Assignment, on_delete=models.SET_NULL, null=True)
    grade = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    timestamp = models.DateTimeField(auto_now_add=True)
    
class PredictedGrade(models.Model):
    student = models.ForeignKey('groups.Student', on_delete=models.SET_NULL, null=True)
    prediction = models.DecimalField(max_digits=5, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

