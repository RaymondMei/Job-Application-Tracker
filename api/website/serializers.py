from rest_framework.serializers import ModelSerializer
from .models import Application
from .models import Job
from .models import User
from .models import Company
from .models import Folder


class UserSerializer(ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'

class FolderSerializer(ModelSerializer):
	class Meta:
		model = Folder
		fields = '__all__'

class CompanySerializer(ModelSerializer):
	class Meta:
		model = Company
		fields = '__all__'

class JobSerializer(ModelSerializer):
	company = CompanySerializer()
	class Meta:
		model = Job
		fields = '__all__'

class ApplicationSerializer(ModelSerializer):
	user = UserSerializer()
	folder = FolderSerializer()
	job = JobSerializer()
	class Meta:
		model = Application
		fields = '__all__'
