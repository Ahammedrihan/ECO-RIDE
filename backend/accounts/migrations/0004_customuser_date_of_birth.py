# Generated by Django 4.2 on 2023-10-17 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_remove_customuser_date_of_birth'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='date_of_birth',
            field=models.DateField(null=True),
        ),
    ]
