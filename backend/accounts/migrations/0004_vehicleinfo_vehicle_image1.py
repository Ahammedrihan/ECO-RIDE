# Generated by Django 4.2.6 on 2023-11-14 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_vehicleinfo'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicleinfo',
            name='vehicle_image1',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='vehicle_images'),
        ),
    ]
