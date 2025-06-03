> # Guía de instalación
> 
> Esta guía te explica cómo levantar el proyecto GGDeals en tu entorno local usando Docker.
> 
> ---
> 
> ## Requisitos
> 
> - Tener instalado **Docker** y **Docker Compose**
> - Puerto `5173` (frontend), `8080` (backend) y `3306` (MySQL) libres
> 
> ---
> 
> ## Paso 1: Clona el repositorio
> 
>   ```bash
>   git clone https://github.com/tu-usuario/ggdeals.git
>
>   cd ggdeals
>   ```
> ---
>
> ## Paso 2: Construye e inicia los contenedores
>
> En la raiz levanta escribe el siguiente comando
> ```bash
>  docker-compose up --build
>  ```
> ![GGDEAL Container](./image/ggdeal-container.PNG)
> 
> ---
>
> ## Paso 3: Accede desde tu navegador
> 
> 1. Frontend: http://localhost:3000
> 
> 2. Backend (API): http://localhost:8080/api/admin
> 
> 3. Base de datos (se genera con el despliegue):
> 
>> - Host: mysql://usuario:contraseña@host:3306/ggdeal-api
>> 
>> - Usuario: root
>> 
>> - Contraseña: verysecret
> 
>> - Base de datos: ggdeal-api
> ![CAPTURA NAVEGADOR CARGANDO APP]