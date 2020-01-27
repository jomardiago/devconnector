# DevConnector 3.0

> Social network for developers

This is a MERN stack application from the "MERN Stack Front To Back" course on [Udemy](https://www.udemy.com/mern-stack-front-to-back/?couponCode=TRAVERSYMEDIA). It is a small social network app that includes authentication, profiles and forum posts.

Note as well that this is different from the tutorial, the tutorial is covering redux thunk as a redux middleware. I used redux-sagas 
for this project. Please don't make this as a reference if you're following the tutorial in Udemy because this has different codes on 
some parts.

Though if you're planning to learn the tutorial and use redux-saga like I did, then you can use this as a reference.

## Quick Start

```
# change default.json file in config folder

# this file is located in config/default.json

# add uri of your mongodb connection for example

 "mongoURI": "mongodb://localhost/dev-social",
 
```

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install

# Run both Express & React from root
npm run dev

# Build for production
cd client
npm run build
```

## App Info

### Udemy Tutor

Brad Traversy
[Traversy Media](http://www.traversymedia.com)

### Developer

Jose Mari A. Diago
[GITHUB](https://jomardiago.github.io/)

### Version

3.0.0

### License

This project is licensed under the MIT License