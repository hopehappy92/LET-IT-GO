# Generated by Django 2.2.7 on 2020-05-15 02:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20200515_1141'),
    ]

    operations = [
        migrations.AlterField(
            model_name='legopart',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.Category'),
        ),
    ]
