# Generated by Django 4.2.6 on 2023-11-13 01:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='accountinfo',
            name='lattitude',
            field=models.DecimalField(decimal_places=20, default=1, max_digits=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='accountinfo',
            name='longitude',
            field=models.DecimalField(decimal_places=20, default=1, max_digits=30),
            preserve_default=False,
        ),
    ]
