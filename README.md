# MEAN Course Assignment

This is my final assignment submission for a Full Stack Developer Bootcamp (MEAN), which achieved top marks. While certain best practices were studied and clarified, for the purposes of this assignment, we were instructed to deviate from them to simplify the examiner's review process.

## Tech-Stack & Languages

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Set-up

1. Make sure you have MongoDB up and running, and that it is accessible at `mongodb://localhost:27017`
2. Make sure you have Node installed (I am using v16.15.0)
3. Open terminal in `./Backend/`
4. Install dependencies with `npm install`
5. Run `npm start`
6. When the terminal confirms the connection, visit `http://localhost:4000/init/drop` to drop eventual conflicting collections. If you don't have any, you will get an error because you are trying to drop what doesn't exist. You can visit this endpoint again in the future if you ever want to re-initialise or clean your Mongo environment.
7. Now, visit `http://localhost:4000/init` to initialise the database, which should now have 2 collections in a dataset called `shyentist`: `users` and `products`
8. Visit `http://localhost:4000` to start from the Home page

## Users

Two users are initialised, one as a client, the other as an admin. To Log in, visit `http://localhost:4000/login`. For the client account, insert email: `daygiovanna@gmail.com` and password `oraoraora`. For the admin account, insert email: `picobuonomo@hotmail.it` and password `Shyentist`. 
