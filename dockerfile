# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package.json .
COPY package-lock.json .

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Instala un servidor estático para servir la aplicación
RUN npm install -g serve

# Expone el puerto en el que correrá la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD ["serve", "-s", "build"]