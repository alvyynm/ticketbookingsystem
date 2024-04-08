# Ticket Booking System

Develop a ticket booking system API.

Here are the requirements.

- The administrator should be able to add/ edit or remove events.

- For each event, the admin should be able to specify the ticket price specifying ticket type (VIP and regular).

- Admin should also be able to specify the maximum number of attendees.

- Users should be able to view events details and reserve tickets (VIP or regular) NB: One user can reserve up to 5 tickets.

- The user should then be able to get an email notification for the successful reservation.


## System Design 

For the full system design features, and the entire process of building the API, refer to the `system-design-doc.md` file.
## Usage

1. Download the code and cd into the directory:
   ```bash
   $ git clone git@github.com:alvyynm/ticketbookingsystem.git
   $ cd ticketbookingsystem
   ```
2. Install necessary libraries and dependencies
   ```bash
   $ cd src && npm install
   ```
3. Navigate to the src directory and start server.
   ```bash
   $ cd src
   $ npm run dev
   ```
   Server runs on port `4000` (by default).

## API Reference

### Routes

#### Authentication Routes

POST `/v1/auth/signup`

```bash
payload:
{
  "name": "Name ",
  "email": "email@example.com",
  "role": "admin" || "user",
  "password": "password@123P"
}
```

POST `/v1/auth/login`

```bash
payload:
{
  "email": "email@example.com",
  "password": "password@123P"
}
```

POST `/v1/auth/logout`

- Logout

```bash
headers:
Authorization: `Bearer ${token}`
```

#### Event Routes

GET `/v1/events`

- Get all events from the database

POST `/v1/events`

- Create a new event
- `admin` role required

```bash
headers:
Authorization: `Bearer ${token}`
```

```bash
payload:
{
  "event_name": "Name of event",
  "event_description": "description of the event",
  "start_date": "2024-03-26T04:10:00.000Z",
  "end_date": "2024-03-29T04:14:00.000Z",
  "max_attendees": "3",
  "ticket_price_vip": "480",
  "ticket_price_regular": "130"
}
```

GET `/v1/events/:event_id`

- Get details about a single event

PUT `/v1/events/:event_id`

- Update a single event
- `admin` role required

```bash
headers:
Authorization: `Bearer ${token}`
```

```bash
payload:
{
  "event_name": "Name of event",
  "event_description": "description of the event",
  "start_date": "2024-03-26T04:10:00.000Z",
  "end_date": "2024-03-29T04:14:00.000Z",
  "max_attendees": "3",
  "available_seats": "1",
  "ticket_price_vip": "480",
  "ticket_price_regular": "130"
}
```

DELETE `/v1/events/:event_id`

- Delete an event
- `admin` role required

```bash
headers:
Authorization: `Bearer ${token}`
```

#### Ticket Routes

POST `/v1/tickets`

- Create a ticket

```bash
payload:
{
  "event_id": 9,
  "seats_reserved": {min: 1, max: 5},
  "ticket_type": "regular" || "vip",
  "ticket_price": 500
}
```

GET `/v1/tickets`

- Get tickets created by logged in user
- Must be authenticated

```bash
headers:
Authorization: `Bearer ${token}`
```

GET `/v1/tickets/:event_id`

- Get details about a ticket
- Must be `admin` user and authenticated

POST `/v1/tickets/verify`

- Verify a ticket's serial number

```bash
payload:
{
  "ticket_serial": "your ticket serial"
}
```
