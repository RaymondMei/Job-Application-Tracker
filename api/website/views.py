from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import datetime
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
	# placeholder_app = {'status': 'Applied', 'company_name': 'Google', 'job_title': 'Software Engineer', 'resume': 'Resume v1', 'date_applied': datetime.datetime.now(), 'salary': '$113 000', 'location': 'California', 'related_information': '-', 'urls': 'https://www.uber.com/ca/en/', 'contacts': '-'}
	# dashboard = {'folderId': folderId, 'apps' : [placeholder_app, placeholder_app]}
	# return render(request, 'dashboard.html', {'dashboard': dashboard})
    # application = [{'id': 1, 'company_name': "ABC Tech Solutions", 'job_title': "Software Engineer", 'resume': "I am an experienced software engineer...", 'date_applied': '7/15/2023', 'salary': 85000, 'location': "San Francisco, CA", 'related_information': "Technical skills: Python, JavaScript, C++", 'urls': "www.example.com/job1", 'contacts': "john.doe@example.com"},
    # {'id': 3, 'company_name': "ABC Tech Solutions", 'job_title': "Software Engineer", 'resume': "I am an experienced software engineer...", 'date_applied': '7/15/2023', 'salary': 85000, 'location': "San Francisco, CA", 'related_information': "Technical skills: Python, JavaScript, C++", 'urls': "www.example.com/job1", 'contacts': "john.doe@example.com"}]
    applications = Application.objects.all()

    # for app in applications:
    #     user = User.objects.get(pk=app.user_id)
    #     folder = Folder.objects.get(pk=app.folder_id)
    #     job = Job.objects.get(pk=app.job_id)
    #     company = Company.objects.get(pk=job.company_id)

    #     userSerializer = UserSerializer(user)
    #     folderSerializer = FolderSerializer(folder)
    #     jobSerializer = JobSerializer(job)
    #     companySerializer = CompanySerializer(company)

    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data)