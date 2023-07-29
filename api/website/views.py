from django.shortcuts import render
from django.http import HttpResponse
import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view


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
	
def login_page(request):
	return HttpResponse('hi')

def register_page(request):
	return render(request, 'register_page.html', {})

def dashboard(request, folderId=1):
	placeholder_app = {'status': 'Applied', 'company_name': 'Google', 'job_title': 'Software Engineer', 'resume': 'Resume v1', 'date_applied': datetime.datetime.now(), 'salary': '$113 000', 'location': 'California', 'related_information': '-', 'urls': 'https://www.uber.com/ca/en/', 'contacts': '-'}
	dashboard = {'folderId': folderId, 'apps' : [placeholder_app, placeholder_app]}
	return render(request, 'dashboard.html', {'dashboard': dashboard})