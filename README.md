# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) 
# NodeJS and React App Deployment

## CORS
```javascript
var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
```

## Method 1
We can deploy our NodeJS app and react app together as one app.

Firstly, you need to add the build version of the react app to the NodeJS, in other to do this : 

- Run `npm run build` from your react app directory. 
- After the build is completed, `copy` or `cut` the `build` folder and `paste` it in the NodeJS root directory.
- modify your NodeJS entry app file `(index.js or server.js or app.js)` with the codes below.

```javascript
//must change your port to this for deployment else it wont work
const PORT = process.env.PORT 

//serves all our static files from the build directory.
app.use(express.static(path.join(__dirname, 'build')));

// After all routes
// This code essentially serves the index.html file on any unknown routes.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT)
```
> Shortcut push code to github

## Method 2

You can choose to deploy your app and two different servers, i.e. push the NodeJS to a separate server instance and push reactJS app to a separate server instance.

In other to get this working:
- Push your reactJS app to a separate repository on GitHub
- Push your NodeJS app to a separate repository on GitHub
- Push each of these to separate Heroku instances


--------
## References
- [React Deployment](https://create-react-app.dev/docs/deployment/)
