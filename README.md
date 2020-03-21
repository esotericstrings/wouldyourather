# Would You Rather Project

This web app was built for the second project of the React Nanodegree program. The "Would You Rather" project is a game which allows users to ask each other questions, answer questions, and get scored according to their participation level in the web app.

## Setup 

Install project dependencies:
* npm install

Run app locally in development mode at http://localhost:3000 :
* npm start

A live version of this project can be found at http://wouldyourather-eso.surge.sh/

## App Pages 
### Login
Users must be logged in to access any pages on the web app. By default, users will be routed to the app home page after login, but if they have been routed to the login page by trying to access a different page, they will be re-routed back to that page after login. Users can only choose to log in from a list of mock users.

### Home
The app home page displays a list of all questions, filtered by answered and unanswered. Questions must be answered in the question detail page, by clicking into the full poll. Answered questions have the current user's answers highlighted and answers cannot be changed.

### Add Question
Users are able to add new questions for others to answer. There is minor error-handling to prevent users from inputting blank questions. Upon submitting a new question, users will be redirected to the home page.

### Leaderboard
Users are listed on the leaderboard based on how much they interact with the app. Users that ask and answers questions more rank higher on the leaderboard. 