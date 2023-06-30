import os

MONGO = {
    # MONGO_HOST: docker compose env, forward to database container name.
    'HOST': os.getenv('DATABASE_HOST', '127.0.0.1'),
    'PORT': 27017,
    'USER_NAME': None,
    'USER_PASSWORD': None,
    'DBNAME': 'local',
    'PARAMS': None
}

