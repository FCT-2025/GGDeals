> # Cómo usar GGDeals
> 
> Esta guía explica las principales funcionalidades desde el punto de vista del usuario y del administrador.
> 
> ---
> 
> ## Usuario registrado
> 
> 1. **Registro e inicio de sesión**
>    - Accede desde la portada.
>    - Se almacena un token JWT seguro en cookies.
> 
>     ![Login](/image/front-login.PNG)
>     ![Register](/image/front-register.PNG)
> 
> 2. **Explorar el catálogo**
>    - Filtros por plataforma, características y precio.
>    - Búsqueda por nombre de juego.
>    
>    ![Categories](./image/front-categories.PNG)
> 
> 3. **Comprar un videojuego**
>    - Selecciona edición y plataforma.
>    - Si hay stock, se te asigna una **clave digital única**.
> 
>    ![Single](./image/front-single-game.PNG)
>    ![Buy](./image/front-sale.png)
>   
> 
> 4. **Perfil de usuario**
>    - Consulta tus claves, compras y perfil.
> 
>    ![Profile Dashboard](./image/front-dashboard.PNG)
>    ![Orders](./image/front-orders.PNG)
>    ![Wallet](./image/front-wallet.PNG)
>    ![Language](./image/front-language.PNG)
> ---
> 
> ## Administrador
> 
> 1. **Login con rol ADMIN**
>    - Acceso al panel de gestión (Thymeleaf).
>      
>      Front:
>     ![Login](/image/login-back.PNG)
>     ![Register](/image/register-back.PNG)
> 
> 2. **Panel administrativo**
>    - Añadir videojuegos y ediciones.
>    - Subir claves digitales (réplicas).
>    - Ver ventas, usuarios y stock.
> 
>    ![Dashboard](./image/back-dashboard.png)
>    ![CRUD Game](./image/back-games.png)
>    ![Edition Game](./image/back-editions-game.png)
>    ![CRUD Keys](./image/back-keys.png)
> ---
> 
>> Todas las rutas están protegidas según rol mediante Spring Security y JWT.
