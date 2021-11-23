# Acquire
By Benjamin Rose

## Table of contents
   * [Acquire at a glance](##Acquire-At-A-Glance)
   * [Styling](##Styling)



## Acquire At A Glance
Acquire is a fullstack app that allows the user to find items for sale, list items for sale and message other users who the user is interested in doing business with.

## Example Usage
### Step 1
   * Visit the site
      * ![image](https://user-images.githubusercontent.com/8016326/142956978-3baea7af-7e2f-4235-84e6-c9caac3acc92.png) 
### Step 2
   * sign up by hovering your mouse over the dropdown menu in the top right corner and clicking sign up
      * ![image](https://user-images.githubusercontent.com/8016326/142957184-868b050b-de74-4ff1-9144-8ab98fc7faca.png)
### Step 3
   * Fill out the sign up form completely and click sign up
      * ![image](https://user-images.githubusercontent.com/8016326/142957447-bcd9cc2d-dd95-4b64-91b7-1db22d132928.png)
### Step 4
   * type in the search box the item you are looking to buy and press search - In this case, I am searching for an Xbox
      * ![image](https://user-images.githubusercontent.com/8016326/142958498-7c6d908a-9d29-4fce-b8a5-8c9f212cab87.png)
### Step 5 
   * Click the option that you want
      * ![image](https://user-images.githubusercontent.com/8016326/142957962-26e94e58-f977-46c3-ad4a-963a89e6335d.png)
### Step 6 
   * Click the 'Message' button if you would like to message the seller about buying the product the seller has for sale
      * ![image](https://user-images.githubusercontent.com/8016326/142958134-4a9ca07c-3876-496c-8be6-030df25bd7ee.png)
### Step 7
   * Type out the message and press send
      * ![image](https://user-images.githubusercontent.com/8016326/142958315-f6c4a2aa-d50e-463c-b219-b9b8e6e71103.png)
### Step 8 
   * Wait for a response or message other buyers
      * ![image](https://user-images.githubusercontent.com/8016326/142958436-66dfe7bb-e8a9-447e-9868-1cd51d0b1225.png)
## Application Architecture
As mentioned before, Acquire is a fullstack application.
   * Backend Server - Python Flask
   * Database - SQLAlchemy
   * Frontend - React Redux
   * Styling - Custom Css

![image](https://user-images.githubusercontent.com/8016326/142907347-cd44b06d-6814-439f-851b-608bf30c9471.png)


## Frontend Overview
### React

Acquire utilized react for its frontend, making use of props, hooks and countless other technologies provided by react. React allowed the process of creating the site to be much more efficient.

### Redux 

Acquire utilized redux for its state management on the frontend, making use of reducers, action creators, and custom thunks. Redux made the majority of all API calls to the backend, and stored all major, immediately needed data. 

## Backend Overview

### Flask 
The Flask server was chosen for ease of use with a supported ORM. The Flask server consists of different routes that perform CRUD operations to the database.

### Postgresql 
Postgresql was chosen as the SQL language and is managed by SQLAlchemy and Alembic.

### Seed Data
Taking advantage of Alembic, The database was seeded with both custom data and data generated via a Faker package.


## Styling

### CSS 
Custom CSS was used for the styling of this project. 
Properties used frequently:
   * Position
      * relative
      * absolute
      * fixed
   * Display
      * flex
      * grid
   * custom scroll bars
   * animations and effects

## Conclusion and Next Steps

Acquire was a blast to create and I look forward to managing it in the future.
There are some features that I plan on implementing in the future 
   * WebSockets for realtime messaging
   * AWS for photo upload
   * Friends and following
   * Comments and likes
   * Friends Feed
   * Responsive styling 
   * Conversion to mobile app with React-Native




