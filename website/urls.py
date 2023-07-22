from django.urls import path, include
from . import views

urlpatterns = [
	path('login/', views.login_page, name='login_page'),
	path('register/', views.register_page, name='register_page'),
	path('dashboard/', views.dashboard, name='dashboard'),
	path('dashboard/<int:folderId>', views.dashboard, name='dashboard'),
]