# Hangman

## Description deliverable

### Elevator pitch

Are you looking for a place to show off your vocabulary? Do you ever wish executions were more fun? Hangman, the classic game of letter guessing and capital punishment! Whether you're learning new words, or discovering a penchant for death, Hangman is the perfect game for kids and parents alike!

### Design

![Desktop Hangman View](./images/hangman.png)

Here is what the mobile version will look like

![Mobile Hangman View](./images/hangman_mobile.png)

### Key features

* Secure login over HTTPS
* Ability to make letter guesses and see
* Game state persists, allowing you to pause whenever you need

### Technologies

I'm going to use the required technologies in the following ways:

* **HTML** - Uses correct HTML structure for application. Three HTML pages. One for playing the game, one for logging in, one for seeing the leaderboard, and one for user settings.
* **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice, and contrast.
* **JavaScript** - Provides login, correct/incorrect letter display, submitting choices, displaying leaderboard information, backend endpoint calls.
* **Service** - Backend service with endpoints for:
  * login & create account
  * retrieving leaderboard information
  * retrieving user settings
  * retrieving current game state

* **DB** - Store users, highscores, current game state, historical game outcomes, and settings in database.
* **Login** - Register and login users. Credentials securely stored in database. Game state, game results, and settings aren't saved unless authenticated. Authentication also allows you to participate in the leaderboard.
* **WebSocket** - As each user completes their game, their results will automatically appear on other users leaderboards.
* **React** - Application ported to use the React web framework

## HTML Deliverables

For this deliverable I built out the structure of my application using HTML.

* **HTML pages** - TBD
* **Links** - TBD
* **Text** - TBD
* **Images** - TBD
* **Login** - TBD
* **Database** - TBD
* **WebSocket** - TBD
