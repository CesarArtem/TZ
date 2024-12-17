# Используем официальный образ Node.js для сборки приложения
FROM node:16 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы приложения
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Используем Nginx для обслуживания собранного приложения
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа
COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]