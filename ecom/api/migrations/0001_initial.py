from django.db import migrations
from api.user.models import CustomUser

class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name='ayush',
                        email='ayush@gmail.com',
                        is_staff=True,
                        is_superuser=True,
                        phone='97986465321',
                        gender='Male',
                        )
        user.set_password("ayush")
        user.save()

    dependencies=[]
    operations=[migrations.RunPython(seed_data)]
