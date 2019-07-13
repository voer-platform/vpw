'''
Created on 16 Dec 2013

@author: huyvq
'''
from base import *

# FOR DEBUG
DEBUG = True
DEVELOPMENT = True
TEMPLATE_DEBUG = DEBUG

# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'vpw',
        'USER': 'voer',
        'PASSWORD': 'voer',
        'HOST': '127.0.0.1',
        'PORT': 3306,
    }
}

#VPR SETTINGS
VPR_URL = 'https://dev.voer.edu.vn:1122/1.0/'
CLIENT_ID = 'vpw'
CLIENT_KEY = ''


#VPT Address
VPT_URL = 'https://dev.voer.edu.vn:1133/'

SITE_URL = 'https://dev.voer.edu.vn'

RECAPTCHA_PUBLIC_KEY = ''
RECAPTCHA_SECRET_KEY = ''

#STATIC_ROOT = os.path.join(PROJECT_DIR, '_static')

COMPRESS_ENABLED = False
