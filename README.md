## API для бронирования места на мероприятие

#### 1. POST api/events/create (создание ивента)

```
{
"name": "nameEvent",  
"total_seats": "123"
}
```

#### 2. POST /api/bookings/reserve (бронирования)
```
{
"event_id": 1,
"user_id": "user123"
}
```

#### GET api/get/tables (запрос на все таблицы и их содержимое, ответ в json )

----
#### Демоверсия на render.com 

```
https://booking-a-place-for-an-event.onrender.com
```

