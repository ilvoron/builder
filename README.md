# DEPRECATED

![No Maintenance Intended](https://img.shields.io/maintenance/no/2020.svg)

# Сборщик проектов для [шаблона GULP](https://github.com/coolpanda02/gulp "Gulp шаблон для Frontend-разработки")

## Для работы потребуется
- [Node.js](https://nodejs.org/ "Node.js") - для работы сборщика

## Установка
- Создаем папку, в которой у нас будут находиться все проекты и выполяем в ней создаем файл `package.json`:

`npm init`

- Скачиваем нужные пакеты локально:
`npm i -D fancy-log exec-sh del`

- Затем настраиваем файл `preferences.json`

## Использование
- Выполняем `node builder` (если вы переименовали файл `builder.js`, то указывайте имя этого файла)

## preferences.json
- ключ `destDir` - папка, в которую соберутся все проекты. Относительный путь работает относительно папки, в которой была запущена [команда сборки](https://github.com/coolpanda02/builder#использование "команда сборки")
- ключ `projects` - массив объектов-проектов.
   - ключ `projectDir` - папка, в которой находится проект. Относительный путь работает относительно папки, в которой была запущена [команда сборки](https://github.com/coolpanda02/builder#использование "команда сборки")
   - ключ `destDir` - подпапка, которую соберется проект. Относительный путь работает относительно папки - значения главного ключа `destDir`

**Пример:**
```json
{
	"destDir": "/_dest",
	"projects": [
		{
			"projectDir": "/_index",
			"destDir": "/"
		},
		{
			"projectDir": "/about",
			"destDir": "/about"
		}
	]
}
```
