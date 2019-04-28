# API-Solo-Project

## Table of Contents

1.  [Introduction](#introduction)
1.  [Overview of Topics](#overview-of-topics)
    1.  [Read User](#read-user)
    1.  [Create User](#create-user)
    1.  [Update User](#update-user)
    1.  [Delete User](#delete-user)
    1.  [Read User by pirate](#delete-user)
1.  [Envirionment](#envirionment)
    1.  [Postgres](#postgres)
    1.  [Resources](#resources)

## Introduction

This was created during my time as a student at Code Chrysalis.
This RESTful API provides features to create, update, delete and read OnePiece data.

## Overview of Topics

### Read User

access either `/user`, or specify by username `/user/Chopper`

### Create User

Use body to pass the data you want to create with JSON format.

(ex: {"username": "Gold D Roger"})

### Update User

Use body to pass the data you want to update with JSON format.

(ex: {"changeThisUser": "Chopper",
"intoThisUser": "Tony Tony Chopper"})

### Delete User

Use body to pass the data you want to delete with JSON format. (Same as creation)

(ex: {"username": "Gold D Roger"})

### Read User from Pirate

User params to get crews on the specific pirate.

specify by pirate name `/pirates/Straw Hat Pirates/users/`

## Environment

### Postgres

You will need postgres installed. If you haven't installed it already, download and install the PostgresApp and verify its working by running the command psql in your terminal.

### Resources

Example:

To install dependencies:

    yarn

To run migrations and set up the database:

    yarn migrate

To roll back migrations

    yarn rollback

To run tests:

    yarn test

To run the app:

    yarn start
