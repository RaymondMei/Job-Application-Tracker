# Generated by Django 4.2.3 on 2023-08-06 22:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='folder_id',
        ),
        migrations.RemoveField(
            model_name='job',
            name='user_id',
        ),
        migrations.AddField(
            model_name='application',
            name='folder_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='website.folder'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='application',
            name='user_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='website.user'),
            preserve_default=False,
        ),
    ]
