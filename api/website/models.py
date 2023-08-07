from django.db import models

# Create your models here.

class Audit_Field(models.Model):
	deleted = models.BooleanField()
	created_by = models.CharField()
	created_date = models.DateField(auto_now_add=True)
	updated_by = models.CharField()
	updated_date = models.DateField(auto_now=True)
	deleted_by = models.CharField(null=True)
	deleted_date = models.DateField(null=True)

	def __str__(self):
		return " - ".join(self.deleted, self.created_by, self.created_date, self.updated_by, self.updated_date, self.deleted_by, self.deleted_date)

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
	email = models.EmailField(null=True)

	audit_fields = models.ForeignKey(Audit_Field, models.CASCADE)

	def __str__(self):
		return self.username + " - " + self.password + " - " + self.email

class Company(models.Model):
	company_id = models.AutoField(primary_key=True)
	company_name = models.CharField(max_length=50, null=False, blank=False)
	location = models.CharField(null=True)
	website = models.URLField(null=True)
	contact = models.TextField(null=True)

	audit_fields = models.ForeignKey(Audit_Field, models.CASCADE)

	def __str__(self):
		return self.company_name

class Job(models.Model):
	job_id = models.AutoField(primary_key=True)
	company = models.ForeignKey(Company, models.CASCADE)
	job_title = models.CharField(max_length=100, null=False, blank=False)
	job_description = models.TextField(null=True, blank=True)
	job_url = models.URLField(null=True)
	salary = models.DecimalField(max_digits=15, decimal_places=2)
	job_notes = models.TextField(null=True)

	audit_fields = models.ForeignKey(Audit_Field, models.CASCADE)

	def __str__(self):
		return self.job_title
	
class Application(models.Model):
	application_id = models.AutoField(primary_key=True)
	user = models.ForeignKey(User, models.CASCADE)
	folder = models.ForeignKey(Folder, models.CASCADE)
	job = models.ForeignKey(Job, models.CASCADE)
	status = models.CharField(max_length=25, null=False, blank=False)
	resume = models.FileField(upload_to='resumes/')
	date_applied = models.DateField()
	deadline = models.DateField()
	related_information = models.TextField()

	audit_fields = models.ForeignKey(Audit_Field, models.CASCADE)

	def __str__(self):
		return "application with id: " + str(self.application_id)