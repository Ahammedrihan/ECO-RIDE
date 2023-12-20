# Generated by Django 4.2.6 on 2023-12-16 06:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('first_name', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=15)),
                ('last_name', models.CharField(max_length=255)),
                ('role', models.CharField(choices=[('admin', 'Admin'), ('user', 'User'), ('driver', 'Driver')], default='user', max_length=20)),
                ('is_driver', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AccountInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('district', models.CharField(max_length=255)),
                ('state', models.CharField(max_length=255)),
                ('pin_code', models.IntegerField()),
                ('latitude', models.DecimalField(decimal_places=20, max_digits=30)),
                ('longitude', models.DecimalField(decimal_places=20, max_digits=30)),
                ('default', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='account_info', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='VehicleInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registration_number', models.CharField(max_length=10, unique=True)),
                ('vehicle_brand', models.CharField(max_length=30)),
                ('vehicle_name', models.CharField(max_length=30)),
                ('vehicle_type', models.CharField(choices=[('sedan', 'Sedan'), ('hatch', 'Hatchback'), ('xuv', 'Xuv')], max_length=20)),
                ('vehicle_color', models.CharField(max_length=30)),
                ('vehicle_year', models.DateField(blank=True, null=True)),
                ('insurance_end_date', models.DateField(blank=True, null=True)),
                ('license_validity', models.DateField(blank=True, null=True)),
                ('seat_capacity', models.IntegerField()),
                ('mileage', models.IntegerField()),
                ('status', models.BooleanField(default=False)),
                ('default', models.BooleanField(default=False)),
                ('vehicle_image1', models.ImageField(blank=True, default=None, null=True, upload_to='vehicle_images/')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vehicle_info', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Trip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_lat', models.DecimalField(decimal_places=20, max_digits=30)),
                ('start_long', models.DecimalField(decimal_places=20, max_digits=30)),
                ('end_lat', models.DecimalField(decimal_places=20, max_digits=30)),
                ('end_long', models.DecimalField(decimal_places=20, max_digits=30)),
                ('start_location_name', models.CharField(default=None, max_length=256, null=True)),
                ('end_location_name', models.CharField(default=None, max_length=256, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('amount', models.FloatField()),
                ('payment_method', models.CharField(choices=[('payafter', 'Payafter'), ('online', 'Online')], max_length=10)),
                ('razorpay_order_id', models.CharField(blank=True, max_length=256, null=True)),
                ('razorpay_payment_id', models.CharField(blank=True, max_length=256, null=True)),
                ('trip_status', models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('started', 'Started'), ('finished', 'finshed')], default='pending', max_length=10)),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='driver_ride', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_ride', to=settings.AUTH_USER_MODEL)),
                ('vehicle', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='ride_vehicle', to='accounts.vehicleinfo')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=10)),
                ('dob', models.DateField(blank=True, null=True)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('alternate_phone', models.CharField(max_length=15)),
                ('profile_image', models.ImageField(blank=True, default='profile_images/download(2).png', null=True, upload_to='profile_images/')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_info', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FinishedTrips',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_lat', models.DecimalField(decimal_places=20, max_digits=30)),
                ('start_long', models.DecimalField(decimal_places=20, max_digits=30)),
                ('end_lat', models.DecimalField(decimal_places=20, max_digits=30)),
                ('end_long', models.DecimalField(decimal_places=20, max_digits=30)),
                ('start_location_name', models.CharField(default=None, max_length=256, null=True)),
                ('end_location_name', models.CharField(default=None, max_length=256, null=True)),
                ('Trip_created_time', models.DateTimeField(null=True)),
                ('Trip_end_time', models.DateTimeField(null=True)),
                ('amount', models.FloatField()),
                ('payment_method', models.CharField(max_length=10)),
                ('payment_status', models.BooleanField(default=False)),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='finish_ride_driver', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='finish_ride_user', to=settings.AUTH_USER_MODEL)),
                ('vehicle', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='finish_ride_vehicle', to='accounts.vehicleinfo')),
            ],
        ),
        migrations.CreateModel(
            name='ActiveDrivers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.DecimalField(decimal_places=20, max_digits=30)),
                ('longitude', models.DecimalField(decimal_places=20, max_digits=30)),
                ('active_time', models.TimeField()),
                ('active_vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.vehicleinfo')),
                ('existing_address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.accountinfo')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
