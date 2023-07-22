from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def login_page(request):
	return render(request, 'login_page.html', {})

def register_page(request):
	return render(request, 'register_page.html', {})

def dashboard(request, folderId=1):
	return render(request, 'dashboard.html', {'folderId': folderId})