from django.shortcuts import render
from django.http import HttpResponse
import datetime


# Create your views here.
def index(request):
	return render(request, 'index.html')
	
def login_page(request):
	return render(request, 'login_page.html', {})

def register_page(request):
	return render(request, 'register_page.html', {})

def dashboard(request, folderId=1):
	placeholder_app = {'status': 'Applied', 'company_name': 'Google', 'job_title': 'Software Engineer', 'resume': 'Resume v1', 'date_applied': datetime.datetime.now(), 'salary': '$113 000', 'location': 'California', 'related_information': '-', 'urls': 'https://www.uber.com/ca/en/', 'contacts': '-'}
	dashboard = {'folderId': folderId, 'apps' : [placeholder_app, placeholder_app]}
	return render(request, 'dashboard.html', {'dashboard': dashboard})