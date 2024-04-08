# System Design Documentation for Ticket Booking System API

## People

- Written by Alvin Wanjala
- Date: March 8, 2024
- Last Updated: `never`

## Overview

The ticket bookings system's API is a web API that provides ticket reservation functionality to end users. It allows end users to reserve tickets of an upcoming event(s). This technical design document outlines the architecture, components, database design and general data flow in the web API.

## 1. Functional Requirements

The key functional requirements of the system include:

- The administrator should be able to add/ edit or remove events.
- For each event, the admin should be able to specify the ticket price specifying ticket type (VIP and regular).

- Admin should also be able to specify the maximum number of attendees.

- Users should be able to view events details and reserve tickets (VIP or regular) NB: One user can reserve up to 5 tickets.

- The user should then be able to get an email notification for the successful reservation.

## 2. Technical Architecture

From a technical perspective, the system needs to be able to support aunthetication and authorization. For example, admins can edit events while users can't. This role-based approach will enable the system implementation as a whole to meet the functional requirements.

From a high-level, the system is divided into three components: Frontend, API and Database.

![System Components](./static/img/system-components.png)

### 2.1 User Interface

The User interface/frontend enables both admins and users to access the system and perform operations based on their roles. The interface can be a web-based UI, a mobile application or even an API-based interface.

### 2.2 API Gateway

The API Gateway servers as the main entry point for all the external requests. It provides a unified interface through which the User interface can interact with the ticket booking system to perform various operations, like logging in, signing up and CRUD operations on the database.

### 2.3 Database

The database store information about all users in the system and also the data. It's placed behind the API gateway and its only purpose is to store information.

## Basic Abstractions in the Ticket Booking System

From the requirements, the system is made up of several abstractions.

These include:

- admin
- user
- events
- tickets.

## Conceptual Database Design

From the basic abstractions of the system, several tables are necessary at the database level. These include a general users table (for both admin and user), an events table and a tickets table.

The events table should include various information, including the maximum number of attendees as specified by the [functional requirements](#1-functional-requirements). The tickets table will store the tickets reserved by the users, while the users table will contain all user information.

From the functional requirements, there needs to be a many to many relationship (M:M) between the user and events table. In other words, many users can create many events and an event can have many attendees.å

To implement this relationship, a joint table UserEvents is used. The table contains two foreign keys, one for the event identifier and one for the user identifier.

Secondly, there's a one-to-many (1:M) relationship between users and tickets. This means that a user can reserve many tickets.

**NB: Of course, there's a limitation of users only being able to reserve up to five tickets maximum per event.**

There's also a one-to-many (1:M) relationship between events and tickets i.e. an event can have many tickets but a ticket can only belong to one event.

![Database Design](./static/img/database-design.png)

In this system, the database is an important component because aside from storing the data, it also helps in enforcing relationships—for example, constraints between tickets and events.

## API Endpoints and Architecture

The API gateway has three major endpoints: `/events`, `/tickets`, and `/auth`. They relate to events, tickets, and authentication, respectively.

The events endpoint allows users to perfom CRUD operations on events. The auth endpoint allows users to login into the system using an email and password. Lastly, the tickets endpoint allows users to reserve tickets for events.
