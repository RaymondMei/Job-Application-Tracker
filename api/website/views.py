from django.shortcuts import render
from django.http import HttpResponse
import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout


# Create your views here.

@api_view(['GET'])
def get_routes(request):

	routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
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
	return Response('hi2')

@api_view(['GET'])
def dashboard(request, folderId=1):
	# placeholder_app = {'status': 'Applied', 'company_name': 'Google', 'job_title': 'Software Engineer', 'resume': 'Resume v1', 'date_applied': datetime.datetime.now(), 'salary': '$113 000', 'location': 'California', 'related_information': '-', 'urls': 'https://www.uber.com/ca/en/', 'contacts': '-'}
	# dashboard = {'folderId': folderId, 'apps' : [placeholder_app, placeholder_app]}
	# return render(request, 'dashboard.html', {'dashboard': dashboard})
    application = [{'id': 1, 'company_name': "ABC Tech Solutions", 'job_title': "Software Engineer", 'resume': "I am an experienced software engineer...", 'date_applied': '7/15/2023', 'salary': 85000, 'location': "San Francisco, CA", 'related_information': "Technical skills: Python, JavaScript, C++", 'urls': "www.example.com/job1", 'contacts': "john.doe@example.com"},
    {'id': 3, 'company_name': "ABC Tech Solutions", 'job_title': "Software Engineer", 'resume': "I am an experienced software engineer...", 'date_applied': '7/15/2023', 'salary': 85000, 'location': "San Francisco, CA", 'related_information': "Technical skills: Python, JavaScript, C++", 'urls': "www.example.com/job1", 'contacts': "john.doe@example.com"}]
    return Response(application)