# Generated by Django 4.2.6 on 2023-12-14 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0019_trip'),
    ]

    operations = [
        migrations.RenameField(
            model_name='trip',
            old_name='transaction_id',
            new_name='razorpay_order_id',
        ),
        migrations.AddField(
            model_name='trip',
            name='razorpay_payment_id',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
