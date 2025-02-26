@echo off
cd /d C:\Users\alaqs\projecttireshop

echo Запуск сервера...
start cmd /k "node server.js"

timeout /t 5

echo Запуск клиента...
start cmd /k "cd client && npm start"

echo Все службы запущены!
exit
