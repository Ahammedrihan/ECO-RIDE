# Generated by Django 4.2.6 on 2023-12-19 04:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='finishedtrips',
            name='total_distance',
            field=models.DecimalField(decimal_places=3, default=1, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='trip',
            name='total_distance',
            field=models.DecimalField(decimal_places=3, default=1, max_digits=10),
            preserve_default=False,
        ),
    ]
