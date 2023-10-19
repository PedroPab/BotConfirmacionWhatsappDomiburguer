
# BotConfirmacionWhatsappDomiburguer

Este proyecto utiliza la API de Meta de WhatsApp para enviar plantillas de mensajes y proporcionar comunicados a clientes. El servicio se creó con el propósito de enviar mensajes con botones para que los clientes confirmen sus pedidos de [Domiburger](https://domiburguer.com) de manera fácil. Trabaja en conjunto con otro servicio de la marca para crear los pedidos y los enlaces de acceso rápido.

## Instalación

Antes de comenzar, asegúrate de tener los siguientes requisitos:

- Una aplicación de Facebook configurada.
- Un número de WhatsApp configurado.

1. Clona el repositorio:

```bash
git clone https://github.com/PedroPab/BotConfirmacionWhatsappDomiburguer.git
cd BotConfirmacionWhatsappDomiburguer
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:

Entendido, aquí está la sección que describirá cómo ejecutar el proyecto con las variables de entorno:

## Ejecución con Variables de Entorno

Para ejecutar el proyecto con las variables de ambiente, debes pasar el nombre de tu entorno como argumento. Por ejemplo, si estás en producción, proporciona la variable `production`. El archivo con las variables correspondientes deberá llamarse `.env.production`.

Ejemplo de ejecución en producción:

```bash
export NODE_ENV="production"; npm run start 
```

Por defecto, el proyecto recogerá las variables del archivo `.env.development`. Para desarrollo solo es ejecutar 

```bash
 npm run dev 
```

Esto cargará las variables de entorno desde el archivo `.env.production`.

Crea un archivo `.env.entorno` en el directorio raíz del proyecto y añade las siguientes variables:

``` txt
JWT_TOKEN=TU_TOKEN_DE_META
NUMBER_ID=TU_ID_DE_NUMERO
VERIFY_TOKEN=TU_FRASE_SECRETA
PORT=PUERTO_DE_TU_SERVIDOR
URL_WEBHOOK_CONFIRMACION=URL_DE_TU_OTRO_SERVICIO
```

## Uso

Asegúrate de tener Node.js y npm instalados. Para iniciar la aplicación, ejecuta:

```bash
 npm run dev 
```

## Contribuir

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).
