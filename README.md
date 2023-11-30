# REBOOST ACADEMY
Bootcamp project. Out idea is to provide a web App that lets a Sport Center to manage their classes, schedules, staff and logistics on one side, and on other side lets users to create accounts on our database and book for specifics classes on our calendar, read their attendances and subscribe to our different services.

# TEAM

- Daniel Vega Suarez - https://github.com/DanielVegaSuarez
- Adrian Angulo Dieppa - https://github.com/adrianaadd
- Raúl Villarraso Morales - https://github.com/RaulVillarraso

# Tech

- ReactJS
- MaterialUI
- Express
- MySQL

# Project Setup
Should do `$ npm i` on both folders "Frontend" and "Backend".
Config a `.env` file as explained on `.env.example`

# Backend Endpoints

<details>
<summary>:point_right: Auth Endpoints</summary>

| METHOD | ENDPOINT                  | TOKEN | ROLE         | DESCRIPTION                        | POST PARAMS                | RETURNS                              |
| ------ | ------------------------- | ----- | ------------ | ---------------------------------- | -------------------------- | -------------------------------|
| POST   | /signup                   | NO    | Client       | Creates an account                 | -                          | { token, rol }                 |
| POST   | /login                    | NO    | Client       | Logs in with corresponding account | -                          | { token, rol }                 |

</details>

<details>
<summary>:point_right: Booking Endpoints</summary>

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                        |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | -------------------------------|
| GET    | /                         | YES    | Client       | Gets all bookings                         | -                          | [{ booking }]                  |
| GET    | /:id                      | YES    | Client       | Gets one booking                          | booking_id                 | { booking }                    |
| GET    | /clase/classroom/:id      | YES    | Client       | Gets all classes and teachers for booking | booking_id                 | { booking }                    |
| POST   | /                         | YES    | Admin        | Creates a booking                         | -                          | Booking created sucessfully    |
| PUT    | /:id                      | YES    | Admin        | Updates a specific booking                | booking_id                 | Booking updated successfully   |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific booking                | booking_id                 | Booking deleted sucessfully    |

</details>

<details>
<summary>:point_right: Class Endpoints</summary>
   
> ***Note:***  Class is a VSCode reserved word, so instead we used the word in Spanish "clase" 

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                        |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | -------------------------------|
| GET    | /                         | YES    | Client       | Gets all classes                          | -                          | [{ classes }]                  |
| GET    | /:id                      | YES    | Admin        | Gets one class                            | class_id                   | { class   }                    |
| GET    | /count/:id                | YES    | Admin        | Gets a count of classes by Teacher        | class_id                   | { class, teacherCount }        |
| POST   | /                         | YES    | Admin        | Creates a class                           | -                          | Class created sucessfully      |
| PUT    | /:id                      | YES    | Admin        | Updates a specific class                  | booking_id                 | Class updated successfully     |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific class                  | booking_id                 | Class deleted sucessfully      |

</details>

<details>
<summary>:point_right: Classroom Endpoints</summary>

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                        |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | -------------------------------|
| GET    | /                         | YES    | Admin        | Gets all classrooms                       | -                          | [{ booking }]                  |
| GET    | /:id                      | YES    | Admin        | Gets one classroom                        | classroom_id               | { classroom }                  |
| GET    | /:id/clase                | YES    | Admin        | Gets the classroom related to a class     | classroom_id               | { classroom }                  |
| POST   | /                         | YES    | Admin        | Creates a classroom                       | -                          | Classroom created sucessfully  |
| PUT    | /:id                      | YES    | Admin        | Updates a specific classroom              | classroom_id               | Classroom updated successfully |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific classroom              | classroom_id               | Classroom deleted sucessfully  |

</details>

<details>
<summary>:point_right: Subscription Endpoints</summary>

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                           |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | --------------------------------- |
| GET    | /                         | YES    | Client       | Gets all subscriptions                    | -                          | [{ subscriptions }]               |
| GET    | /:id                      | YES    | Client       | Gets one subscription                     | subscription_id            | { subscription }                  |
| POST   | /                         | YES    | Admin        | Creates a subscription                    | -                          | Subscription created sucessfully  |
| PUT    | /:id                      | YES    | Admin        | Updates a specific subscription           | subscription_id            | Subscription updated successfully |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific subscription           | subscription_id            | Subscription deleted sucessfully  |

</details>

<details>
<summary>:point_right: Teacher Endpoints</summary>

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                           |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | --------------------------------- |
| GET    | /                         | YES    | Client       | Gets all teachers                         | -                          | [{ teachers }]                    |
| GET    | /:id                      | YES    | Client       | Gets one teacher                          | teacher_id                 | { teacher }                       |
| POST   | /                         | YES    | Admin        | Creates a teacher                         | -                          | Teacher created sucessfully       |
| PUT    | /:id                      | YES    | Admin        | Updates a specific teacher                | teacher_id                 | Teacher updated successfully      |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific teacher                | teacher_id                 | Teacher deleted sucessfully       |

</details>

<details>
<summary>:point_right: User Endpoints</summary>

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                           |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | --------------------------------- |
| GET    | /profile                  | YES    | Client       | Gets the profile of the login user        | -                          | { user }                          |
| GET    | /suscription              | YES    | Client       | Gets the actual suscription of user       | -                          | { suscription }                   |
| GET    | /                         | YES    | Client       | Gets all users                            | -                          | [{ users }]                       |
| GET    | /userbooking/:id          | YES    | Client       | Gets all user's bookings                  | user_id                    | { user.bookings }                 |
| GET    | /:id                      | YES    | Client       | Gets a specific user                      | user_id                    | { user }                          |
| GET    | /booking/:id              | YES    | Client       | Gets the classes the user is booked       | user_id                    | [{ classes }]                     |
| POST   | /                         | YES    | Client       | Creates a user                            | -                          | User created successfully         |
| POST   | /userbooking              | YES    | Client       | Books a user to a booking                 | -                          | Booked successfully               |
| DELETE | /userbooking/delete       | YES    | Client       | Deletes the booking of a user             | -                          | User booking deleted              |
| PUT    | /:id                      | YES    | Client       | Updates a specific user                   | user_id                    | User updated successfully         |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific user                   | user_id                    | User deleted sucessfully          |

</details>
