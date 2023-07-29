from django.db import models

# Create your models here.

class Audit_Field(models.Model):
	deleted = models.BooleanField()
	created_by = models.CharField()
	created_date = models.DateField(auto_now_add=True)
	updated_by = models.CharField()
	updated_date = models.DateField(auto_now=True)
	deleted_by = models.CharField()
	deleted_date = models.DateField()

	def __str__(self):
		return " - ".join(deleted, created_by, created_date, updated_by, updated_date, deleted_by, deleted_date)

class Folder(models.Model):
	folder_id = models.AutoField(primary_key=True)
	folder_name = models.CharField(unique=True, max_length=100, null=False, blank=False)

	audit_fields = models.ForeignKey(Audit_Field, models.CASCADE)

	def __str__(self):
		return self.folder_name

class User(models.Model):
	user_id = models.AutoField(primary_key=True)
	username = models.CharField(unique=True, max_length=50, null=False, blank=False)
	password = models.CharField(max_length=50, null=False, blank=False)
	email = models.EmailField()

	audit_fields = models.ForeignKey(Audit_Field, models.CASCADE)

	def __str__(self):
		return self.username + " - " + self.password + " - " + self.email

class Company(models.Model):
	company_id = models.AutoField(primary_key=True)
	company_name = models.CharField(max_length=50, null=False, blank=False)
	location = models.CharField()
	website = models.URLField()
	contacts = models.TextField()

	audit_fields = models.ForeignKey(Audit_Field, models.CASCADE)

	def __str__(self):
		return company_name

class Job(models.Model):
	job_id = models.AutoField(primary_key=True)
	user_id = models.ForeignKey(User, models.CASCADE)
	folder_id = models.ForeignKey(Folder, models.CASCADE)
	company_id = models.ForeignKey(Company, models.CASCADE)
	job_title = models.CharField(max_length=100, null=False, blank=False)
	job_description = models.TextField(null=True, blank=True)
	job_URL = models.URLField()
	salary = models.DecimalField(max_digits=15, decimal_places=2)
	job_notes = models.TextField()

	audit_fields = models.ForeignKey(Audit_Field, models.CASCADE)

	def __str__(self):
		return self.job_title
	
class Application(models.Model):
	application_id = models.AutoField(primary_key=True)
	job_id = models.ForeignKey(Job, models.CASCADE)
	status = models.CharField(max_length=25, null=False, blank=False)
	resume = models.FileField(upload_to='resumes/')
	date_applied = models.DateField()
	deadline = models.DateField()
	related_information = models.TextField()

	audit_fields = models.ForeignKey(Audit_Field, models.CASCADE)

	def __str__(self):
		return "application with id: " + application_id