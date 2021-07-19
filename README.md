# Contacts app
***

##### Задание 1. Данные доступны с сервера [https://randomuser.me/api/?results=200](https://randomuser.me/api/?results=100)

Отображение данных в виде таблицы.
Колонки ряда таблицы:

- Avatar
- Fullname
- Birthday (формат - День недели, mm/dd/yyyy, hh:mm am, кол-во лет)
- Email (должен быть кликабельным с возможностью скопировать)
- Phone (должен быть кликабельным с возможностью скопировать)
- Location (Страна, Город)
- Национальность

##### Задание 2. Должна быть возможность переключения режима просмотра данных:

- табличный вид
- плиточный вид

Выбранное значение должно запоминаться в localStorage и в состоянии приложения.
При обновление страницы или перемонтировании компонента, данные должны
отобразиться в том виде, который выбрал пользователь. Если страница посещается
впервые, то использовать по-умолчанию табличный вид

##### Задание 3. Должна быть возможность фильтровать данные:

- по полному имени;
- по половому признаку;
- по национальности;

Фильтрация должна происходить без ручной отправки формы.

Очистка фильтра возвращает коллекцию к изначальному состоянию.

Фильтровать нужно всю коллекцию, а не только ту часть которая сейчас в таблице
отображается.

##### Задание 4. Вывести пагинацию

- по 10 пользователей на странице
- кол-во страниц зависит от кол-во учитывая фильтр

##### Задание 5. Должна быть возможность сортировать данные по полному имени в трех состояниях:

- отAдоZ
- отZдоA
- изначальный порядок

Сортировать нужно всю коллекцию, а не только ту часть которая сейчас в таблице
отображается

##### Задание 6. Под таблицей необходимо вывести статистику по данным

- размер коллекции
- кол-во мужчин, женщин и неопределившихся
- вывести кого больше
- кол-во контактов по каждой национальности

##### Задание 7. Должна быть возможность обновить данные по клику на кнопку без перезагрузки страницы