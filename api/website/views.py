from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import datetime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from django.db import transaction
from .models import Application
from .models import Job
from .models import User
from .models import Company
from .models import Folder
from .serializers import ApplicationSerializer
from .serializers import JobSerializer
from .serializers import UserSerializer
from .serializers import CompanySerializer
from .serializers import FolderSerializer

# Create your views here.

@api_view(['GET'])
def get_routes(request):
    routes = [{'test': 'test_route'}, {'test2': 'test_route2'}]
    return Response(routes)

def index(request):
	return render(request, 'index.html')


@api_view(['GET', 'POST'])
def login_page(request):
    if request.method == 'GET':
        return Response('hi123')
    elif request.method == 'POST':
        requestData = request.data
        username = requestData['username']
        password = requestData['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response('success')
        else:
            return Response('fail')
    else:
        return Response('invalid method')


def register_page(request):
	return Response('registering')

@api_view(['GET'])
def dashboard(request, folderId=1):
    applications = Application.objects.all()

    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data)

@transaction.atomic # lock database on update to prevent multiple users editing 
@api_view(['GET', 'PATCH'])
def application(request, application_id=-1):
    if application_id == -1:
        return Response('Invalid Application Id', status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        application = Application.objects.get(pk=application_id)

        serializer = ApplicationSerializer(application)
        return Response(serializer.data)
    elif 'PATCH':
        try:
            application = Application.objects.select_for_update().get(pk=application_id)
        except Application.DoesNotExist:
            return Response('Invalid Application', status=status.HTTP_404_NOT_FOUND)
        try:
            job = Job.objects.select_for_update().get(pk=application.job_id)
        except Job.DoesNotExist:
            return Response('Invalid Job', status=status.HTTP_404_NOT_FOUND)
        try:
            company = Company.objects.select_for_update().get(pk=job.company_id)
        except Company.DoesNotExist:
            return Response('Invalid Company', status=status.HTTP_404_NOT_FOUND)
        
        if 'job_title' in request.data:
            job.job_title = request.data['job_title']
        
        if 'company_name' in request.data:
            company.company_name = request.data['company_name']
        
        if 'location' in request.data:
            company.location = request.data['location']

        if 'salary' in request.data:
            job.salary = request.data['salary']

        if 'post_url' in request.data:
            job.job_url = request.data['post_url']

        if 'date_applied' in request.data:
            application.date_applied = request.data['date_applied']

        if 'deadline' in request.data:
            application.deadline = request.data['deadline']

        if 'resume' in request.data:
            application.resume = request.data['resume']

        if 'related_information' in request.data:
            application.related_information = request.data['related_information']

        company.save()       
        job.save()
        application.save()

        return Response("Updated Application", status=status.HTTP_200_OK)
    else:
        return Response('Invalid Method', status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def create_application(request):
    requestData = request.data
    job_title = requestData['job_title']
    company_name = requestData['company_name']
    location = requestData['location']
    salary = requestData['salary']
    post_url = requestData['post_url']
    date_applied = requestData['date_applied']
    deadline = requestData['deadline']
    resume = requestData['resume']
    related_information = requestData['related_information']

    company = Company(company_name=company_name, location=location, audit_fields_id=3)
    company.save()

    job = Job(job_title=job_title, salary=salary, company_id=company.pk, job_url=post_url, audit_fields_id=3)
    job.save()

    application = Application(status="Not Applied", resume=resume, date_applied=date_applied, deadline=deadline, related_information=related_information, job_id=job.pk, folder_id=1, user_id=2, audit_fields_id=3)
    application.save()

    return Response(requestData, status=status.HTTP_201_CREATED)