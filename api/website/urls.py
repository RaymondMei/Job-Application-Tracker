from django.urls import path, include
from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path('get_routes/', views.get_routes, name='get_routes'),
	path('login/', views.login_page, name='login_page'),
	path('register/', views.register_page, name='register_page'),
	path('dashboard/', views.dashboard, name='dashboard'),
	path('dashboard/<int:folderId>', views.dashboard, name='dashboard'),
	path('applications/<int:application_id>', views.get_application, name='get_application'),
	path('applications/', views.create_application, name="create_application"),
]