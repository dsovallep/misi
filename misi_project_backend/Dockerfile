# Usar una imagen base dePython
FROM python:3.10-slim-buster

# Instala herramientas de red
RUN apt-get update && apt-get install -y \
    iputils-ping \
    netcat \
    && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto a /app en el contenedor
COPY . /app

# Instala las dependencias del proyecto
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto en el que Django corre por defecto
EXPOSE 8000

# Comando para iniciar Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"] 
