# System Design Documentation for Ticket Booking System API

## People

- Written by Alvin Wanjala
- Date: March 8, 2024
- Last Updated: April 8, 2024

## Overview

The ticket bookings system's API is a API that provides ticket reservation functionality to end users. It allows end users to reserve tickets of upcoming event(s). This technical design document outlines the architecture, components, database design and general data flow in the API.

## 1. Functional Requirements

The key functional requirements of the system include:

- The administrator should be able to add/ edit or remove events.
- For each event, the admin should be able to specify the ticket price specifying ticket type (VIP and regular).

- Admin should also be able to specify the maximum number of attendees.

- Users should be able to view events details and reserve tickets (VIP or regular)

- One user can reserve up to 5 tickets per event.

- A user should then be able to get an email notification after successful reservation.

## 2. Technical Architecture

From a technical perspective, the system needs to be able to support aunthetication and authorization. For example, admins can edit events while users can't. This role-based approach will enable the system implementation as a whole to meet the functional requirements.

From a high-level, the system is divided into two main components: API and Database.

![System Components](./static/img/system-components.png)


### 2.1 API Gateway

The API Gateway servers as the main entry point for all the external requests. It provides a unified interface through which the users can interact with the ticket booking system API to perform various operations, like logging in, signing up and performing CRUD operations on the database.

### 2.2 Database

The database store information about all users in the system and also the data. It's placed behind the API gateway and its only purpose is to store information.

## Basic Abstractions in the Ticket Booking System API

The system is made up of several abstractions.

These include:

- admin
- user
- events
- tickets.

## Conceptual Database Design

From the basic abstractions of the system, several tables are necessary at the database level. These include a general users table (for both admin and user), an events table and a tickets table.

The events table should include various information, including the maximum number of attendees as specified by the [functional requirements](#1-functional-requirements). The tickets table will store the tickets reserved by the users, while the users table will contain all user information.

From the functional requirements, there needs to be a many to many relationship (M:M) between the user and events table. In other words, many users can create many events and an event can have many attendees.

To implement this relationship, a joint table `UserEvents` (the name used to explicitly reveal the data stored) is used. The table contains two foreign keys, one for the event identifier and one for the user identifier.

Secondly, there's a one-to-many (1:M) relationship between users and tickets. This means that a user can reserve many tickets but a ticket can only belong to one user.

**NB: Of course, there's a limitation of users only being able to reserve up to five tickets maximum per event. This constraint is implemented in the application logic.**

There's also a one-to-many (1:M) relationship between events and tickets i.e. an event can have many tickets but a ticket can only belong to one event.

![Database Design](./static/img/database-design.png)

In this system, the database is an important component because aside from storing the data, it also helps in enforcing relationships—for example, constraints between tickets and events.

### User Table

Ther user table contains several fields. They include information related to users (both admins and regular users) in the system. The fields defined in the `Users` table include: `id`, `user_email`, `user_name`, `user_role`, and `user_password`. 

| Field   | Attributes |
| -------- | ------- |
| id  | PK, Autoincrement, INTEGER, Not Nullable   |
| user_email| STRING    |
| user_name   | STRING    |
| user_role   | ENUM ("admin", "user")    |
| user_password   | STRING    |

### Event Table

The event table contains several fields, as follows: 

| Field   | Attributes |
| -------- | ------- |
| id  | PK, Autoincrement, INTEGER, Not Nullable   |
| event_name| STRING    |
| event_description   | TEXT    |
| start_date  | DATE    |
| end_date  | DATE    |
| ticket_price_vip  | FLOAT    |
| ticket_price_regular  | FLOAT    |
| available_seats  | INTEGER   |
| created_by | INTEGER   |
| deleted_by | INTEGER   |

Besides the necessary fields for an event, the table also includes a `created_by` and `deleted_by` fields for ensuring tracking. This allows tracking of users responsible for creating an event(s) as well as deleting them.

### Ticket Table

The ticket table stores ticket data when a user creates a reservation for an event. IT includes the following fields:

| Field   | Attributes |
| -------- | ------- |
| id  | PK, Autoincrement, INTEGER, Not Nullable   |
| user_id| FK(id field, User table), INTEGER   |
| event_id   | FK(id field, Event table), INTEGER    |
| seats_reserved  | INT (min: 1, max: 5)    |
| ticket_type  | ENUM ("vip", "regular")    |
| reservation_date | DATE   |
| ticket_price  | FLOAT    |
| ticket_serial  | STRING   |

### UserEvent Table

The `UserEvent` table is a joint table for implementing a `M:M` relationship between the User and Event table. It includes the following fields:

| Field   | Attributes |
| -------- | ------- |
| id  | PK, Autoincrement, INTEGER, Not Nullable   |
| user_id| FK(id field, User table), INTEGER   |
| event_id   | FK(id field, Event table), INTEGER    |


## API Endpoints and Architecture

The API gateway has three major endpoints: `/events`, `/tickets`, and `/auth`. They relate to events, tickets, and authentication, respectively.

The events endpoint allows users to perfom CRUD operations on events. The auth endpoint allows users to login into the system using an email and password. Lastly, the tickets endpoint allows users to reserve tickets for events.
