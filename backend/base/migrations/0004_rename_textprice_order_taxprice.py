# Generated by Django 4.1.6 on 2023-03-02 14:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='textPrice',
            new_name='taxPrice',
        ),
    ]
