<h1 align="center">
Portfolio - Diary web app
</h1>
<h3 align="center">
📓  Take a note about your daydream anytime💭
</h3>

<p align="right"> 
<img src="https://shields-io-visitor-counter.herokuapp.com/badge?page=MasahiroKaga.shields-io-visitor-counter&color=1D70B8&logo=GitHub&logoColor=FFFFFF&style=flat-square"></img>
<img src="http://img.shields.io/badge/license-MIT-blue.svg"></img>

</p>

## URL

&emsp;[Diary note app - https://note-app-masamern.herokuapp.com/](https://note-app-masamern.herokuapp.com/)

<br>

## Features

- MERN stack.
- Redux to manage state.
- Use axios for RestAPI.
- Cloudinary to save photo.
- Search function for bunch of saved diaries.
- React Bootstrap is used for styling.
- Use Mongodb as database.
- Set Registration and authentication system with web token.
- Validation works.
- Fully responsive.

<br>

## Demo

<br>

1. Sign up(Mongodb is active, so you can sign up.)
<div>
    <img src="public/demo_gif/01_signup.gif" width="100%" height="auto">
</div>
<br>

2. Login with email and password.
<div>
    <img src="public/demo_gif/02_login_and_validation.gif" width="100%" height="auto">
</div>
<br>

3. Write diary as a login user.
<div>
    <img src="public/demo_gif/03_write_diary.gif" width="100%" height="auto">
</div>
<br>

4. Edit and delete diary.
<div>
    <img src="public/demo_gif/04_edit_and_delete.gif" width="100%" height="auto">
</div>
<br>

5. Update profile.
<div>
    <img src="public/demo_gif/05_update_profile.gif" width="100%" height="auto">
</div>
<br>

6. Search diary.
<div>
    <img src="public/demo_gif/06_search_diary.gif" width="100%" height="auto">
</div>
<br>

## Proud of

- Applied saving photo function with "Cloudinary".
- State management with Redux.
- Run client and server with using "concurrently" module.
- No need to change environment variables when we run this program because I have set appropriate cors option in server side.

<br>

## Usage

&emsp;On the terminal under "portfolio_note-app" folder, hit the command below to launch web page on your local environment.

```
npm run dev
```

&emsp;Since Concurrently in installed as a module, client and server side programs will run at the same time.

<br>

## Deploy

- Heroku(For client and server side)
  