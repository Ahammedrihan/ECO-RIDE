# Generated by Django 4.2.6 on 2023-11-24 05:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_remove_accountinfo_about_remove_accountinfo_age_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='accountinfo',
            old_name='lattitude',
            new_name='latitude',
        ),
    ]
