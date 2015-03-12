# City Issue Tracker

## Contents

* [Introduction](#introduction)
	- [Features](#features)
* [Installation](#installation)
* Walkthrough
	- Overview
	- Back end
	- Front end
	- Test suite
* Contributing
	- Continuous integration
* [Appendix](#appendix)
	- Working in Node

## Introduction

The city issue tracker provides a way for citizens to submit issues (e.g. graffiti, a streetlight is out) and be in a close feedback loop with the city. It is written in [Node](https://nodejs.org/) using [Express](http://expressjs.com/), [Mongoose (Mongo)](http://mongoosejs.com/index.html), and [React](http://facebook.github.io/react/).

### Features (forthcoming, some of them)

- issue reporting
	- geolocation
	- picture taking
- administrative features
	- add service types (issue categories)
	- comment on issues

## Installation

Install [Node.js](https://nodejs.org/) and [MongoDB](http://docs.mongodb.org/manual/installation/). After that,

	git clone (clone url) && cd city-issue-server

Install your dependencies using npm (which comes with Node)(sudo may be necessary):

	npm install

Start the server:

	npm start

After that, it should be running at http://localhost:3000/!