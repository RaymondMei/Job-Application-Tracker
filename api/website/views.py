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
    applications = Application.objects.all()

    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_application(request, application_id=None):
    applications = Application.objects.get(pk=application_id)

    serializer = ApplicationSerializer(applications)
    return Response(serializer.data)