# Musictify

Welcome to Musictify github repo! You want to join us for developing Musictify? it's very helpful!

*Main Contributor:*
- [@blackjac7](https://github.com/blackjac7 "@blackjac7")

- [@HantuPutih](https://github.com/HantuPutih "@HantuPutih")

## Before you start
You need [Node.js](https://nodejs.org/en/ "Node.js") to start developing this app.

### DB Scheme
![Scheme Pair Project](https://i.postimg.cc/Xqs15dtc/ERD-Musictify.png)


## Let's get started

1. FIRST, clone this repo > `$ git clone https://github.com/blackjac7/musictify.git`
2. SECOND, change dir to your repo dir > `$cd musictify`
3. AND LASTLY, install the packages > `$npm install`

Run it with nodemon or others.

>if you want to check, visit [http://localhost:4000](http://localhost:4000 "http://localhost:4000")

## Router
| Router                 | Method        | Description                    |
|:---------------------- |:------------- |:------------------------------ |
| `'/'`                  | `GET`         | Show the Landing Page          |
| `'/login`              | `GET`         | Show the Login Form            |
| `'/login`              | `POST`        | Login session                  |
| `'/register`           | `GET`         | Show the Register Form         |
| `'/register`           | `POST`        | Create account                 |
| `'/logout`             | `GET`         | Logout session                 |
| `'/music`              | `GET`         | Show all music                 |
| `'/add`                | `GET`         | Create new music form          |
| `'/add`                | `POST`        | Create new music               |
| `'/edit/:id`           | `GET`         | Edit music form                |
| `'/edit/:id`           | `POST`        | Editing music                  |
| `'/delete/:id`         | `GET`         | Deleting music                 |
| `'/upload/:id`         | `GET`         | Show upload form               |
| `'/upload/:id`         | `POST`        | Uploading form                 |
| `'/seePlaylist/:id`    | `GET`         | Show playlist User             |
| `'/othersLiked/:id`    | `GET`         | Show music liked by other user |
| `'/addToMyPlaylist/:id`| `GET`         | Adding music to user playlist  |


## Technology used

<img src="https://nodejs.org/static/images/logo.svg" width="96"><img src="https://www.kindpng.com/picc/m/261-2619141_cage-clipart-victorian-cloud-upload-icon-svg-hd.png" width="48">

## Demo
Visit this one to see what [Musictify](https://enigmatic-bastion-95269.herokuapp.com/ "Musictify") is.
