FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for scikit-learn
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Upgrade pip and install Python dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create necessary directories (only data, models already exists)
RUN mkdir -p data

# Expose port (Railway will override this with PORT env var)
EXPOSE 5001

# Run the Flask application
CMD ["python", "app.py"]
