FROM python:3.12-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY services/payment_service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY services/payment_service/ ./services/payment_service/
COPY shared/ ./shared/

CMD ["python", "services/payment_service/main.py"]
