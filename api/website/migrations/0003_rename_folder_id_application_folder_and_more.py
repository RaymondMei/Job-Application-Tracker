# Generated by Django 4.2.3 on 2023-08-06 22:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0002_remove_job_folder_id_remove_job_user_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='application',
            old_name='folder_id',
            new_name='folder',
        ),
        migrations.RenameField(
            model_name='application',
            old_name='job_id',
            new_name='job',
        ),
        migrations.RenameField(
            model_name='application',
            old_name='user_id',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='job',
            old_name='company_id',
            new_name='company',
        ),
    ]