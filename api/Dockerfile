FROM python:3.9-alpine

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV DJANGO_SETTINGS_MODULE jobapptracker.settings

RUN pip install --upgrade pip

# Create and set the working directory
WORKDIR /app/api

# Install dependencies
COPY requirements.txt /app/api/

# Build psycopg2-binary from source -- add required dependencies
RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev && \
        pip install --no-cache-dir -r requirements.txt && \
        apk --purge del .build-deps

# Copy your Django project files
COPY . /app/api/

EXPOSE 8000
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
