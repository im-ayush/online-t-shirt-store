<<<<<<< HEAD
# online-t-shirt-store

- **Home**
![Home Page](https://github.com/im-ayush/online-t-shirt-store/blob/master/home.png)

- **Cart**
![Cart View](https://github.com/im-ayush/online-t-shirt-store/blob/master/cart.png)

- **Barintree Payment Gateway**
![Successful Payment](https://github.com/im-ayush/online-t-shirt-store/blob/master/payment.jpg)
=======
# Analyst.ai Assignment
`Django` `DjangoRestFramework` `React js` `MySQL`


### How to run the project (Windows)

## Backend
Start your terminal(Command prompt)
1. Create a virtual environment.
	`py -m venv <virtual environment name>`

2. Activate your virtual environment.
	`<virtual environment name>\Scripts\activate`

3. Navigate to `analyst-ai/back`, and install all dependencies from requirements.txt
	`pip install -r requirements.txt`

4. Configure the Database. You can configure your database in `analyst-ai/back/back/settings.py`. Configuration for MySQL and sqlite3 is already provided, you just need to comment one while using the other.
While using MySQL, remember to set your db credentials within DATABASES.

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '<your db name>',
        'USER': '<your username>',
				'PASSWORD': '<your password>'
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

5. Run migrations.
	`py manage.py makemigrations`
	`py manage.py migrate`

6. Create admin user or superuser.
	`py manage.py createsuperuser --username="<your username>" --email="your email"`
	Enter your password when prompted.

7. Start the server.
	`py manage.py runserver`



## Frontend
1. Navigate to 'analyst-ai/frontend' and install dependencies.
	`npm install`

2. Start the app server.
	`npm start`
>>>>>>> 6ed56b6a9860accdcadc9515d0a8d9156724f7cc
