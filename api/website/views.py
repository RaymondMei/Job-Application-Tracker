from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import datetime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
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

@api_view(['GET'])
def get_application(request, application_id=None):
    applications = Application.objects.get(pk=application_id)

    serializer = ApplicationSerializer(applications)
    return Response(serializer.data)

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

    return Response('nice', status=status.HTTP_201_CREATED)