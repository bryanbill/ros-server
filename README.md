# ROS-Server

## Installation
First, clone the project to your local machine either using SSH or HTTPS
> `git clone git@github.com:bryanbill/ros-server.git`

Install the project dependencies
> `npm install`


The project is using docker so you need to have it up and running. But before doing so, make sure you have docker-compose is installed in your machine.
> ** Linux: Run`sudo apt install docker-compose` or `sudo apt-get install docker-compose`
> `docker-compose up -d`

Make sure Redis is installed in your machine since we'll be using Redis for Caching purposes
> Installation: `sudo apt install redis`
> Starting the Redis Server: `sudo systemctl start redis`
> Check the status of the service: `sudo systemctl status redis`


Configure your dev environment
> cp .env.example .env.development


Run the app
> `npm run dev`
