<h1 align="center">
Portfolio - Open AI Play Ground
</h1>
<h3 align="center">
🤖  Empower Every Day with AI Excellence! 🚀
</h3>

<p align="right"> 

</p>

## URL

&emsp;[OpenAI app - Deployed on AWS EC2. Currently, the instance is stopped, so the app is unavailable.]



<br>

## Features

- Built with MERN stack.
- Hosted on AWS EC2.
- Offers three main services: Image generation, Chat, and Audio transcription.
- Integrates with OpenAI's API.
- App configuration with Docker and Webpack.
- Built using TypeScript.
- Session management for user authentication.
- State management with Redux.
- RESTful API calls using Axios.
- Styled with Material UI (MUI).
- Also styled using Tailwind.
- Input validation with the JOI module.
- Fully responsive design.

<br>

## Demo

<br>

1. User registration, login, and logout functionalities. Redux manages access rights to other pages.  
<!-- <div align="center">
	<video width="900" height="auto" controls>
		<source src="public/demo/01_signup.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video>
</div> -->

<br>

2. Demonstrating login and session persistence (session data is visible in both the database and browser inspection).
<!-- <div align="center">
	<video width="900" height="auto" controls>
		<source src="public/demo/02_login_session.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video>
</div> -->

<br>

3. Image generation feature.
<!-- <div align="center">
	<video width="900" height="auto" controls>
		<source src="public/demo/03_image_generator.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video>
</div> -->

<br>

4. Chatting with AI functionality.
<!-- <div align="center">
	<video width="900" height="auto" controls>
		<source src="public/demo/04_gpt_handler.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video>
</div> -->

<br>

5. Audio transcription from audio files.
<!-- <div align="center">
	<video width="900" height="auto" controls>
		<source src="public/demo/05_audio_scriptor.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video>
</div> -->

<br>

6. Error handling for unauthorized user access to service pages without logging in.
<!-- <div align="center">
	<video width="900" height="auto" controls>
		<source src="public/demo/06_error_page.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video>
</div> -->

<br>

## Proud of

- Secure session handling with "express-session".
- Efficient state management using Redux.
- Docker ensures seamless app setup across different local environments.

<br>

## Usage

&emsp;First, you'll need to set up a Docker environment on your machine. Once done, run the following command in the root directory of the app:

```
docker-compose up
```

&emsp;Thanks to the inclusion of the "Concurrently" module, both client and server-side applications will run simultaneously.

&emsp;Lastly, ensure you have a .env file in the app's root directory. Define SESSION_SECRET with a random string and CHATGPT_APIKEY. Note: An API key from OpenAI is required, which might be paid.

```
NODE_ENV=development
REACT_APP_NODE_ENV=development
REACT_APP_CLIENT_PORT=3000
REACT_APP_SERVER_PORT=8000
REACT_APP_URL=http://localhost
MONGODB_PORT=27017
MONGODB_USERNAME=root
MONGODB_PASSWORD=gpt_mongo
MONGODB_DRIVER=mongodb://
MONGODB_DATABASE=mongo:27017/dev?authMechanism=DEFAULT&authSource=admin&directConnection=true
EXECUTABLE_DALL_E=true
EXECUTABLE_GPT=true
EXECUTABLE_WHISPER=true
SESSION_SECRET=
CHATGPT_APIKEY=

```

<br>

## Deploy

- AWS EC2 (For both client and server-side hosting)