# Generated by Django 4.2.3 on 2023-08-06 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0003_rename_folder_id_application_folder_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audit_field',
            name='deleted_by',
            field=models.CharField(null=True),
        ),
        migrations.AlterField(
            model_name='audit_field',
            name='deleted_date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
    ]
