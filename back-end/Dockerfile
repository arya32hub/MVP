FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

RUN apt-get update && apt-get install -y \
    poppler-utils \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 8000

CMD ["python", "app.py"]