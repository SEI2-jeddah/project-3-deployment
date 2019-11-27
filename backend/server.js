const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5600;

const cors = require("cors");

var allowedOrigins = ["http://localhost:5600", "http://localhost:3001"];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var message =
          "The CORS policy for this application does not allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  })
);

let jokes = [
  {
    id: 164,
    type: "general",
    setup: "What did one plate say to the other plate?",
    punchline: "Dinner is on me!"
  },
  {
    id: 271,
    type: "general",
    setup: "What kind of tree fits in your hand?",
    punchline: "A palm tree!"
  },
  {
    id: 70,
    type: "general",
    setup: "I can't tell if i like this blender...",
    punchline: "It keeps giving me mixed results."
  },
  {
    id: 212,
    type: "general",
    setup: "what do you call a dog that can do magic tricks?",
    punchline: "a labracadabrador"
  },
  {
    id: 112,
    type: "general",
    setup: "Have you heard of the band 1023MB?",
    punchline: "They haven't got a gig yet."
  },
  {
    id: 31,
    type: "general",
    setup: "What happens to a frog's car when it breaks down?",
    punchline: "It gets toad away"
  },
  {
    id: 15,
    type: "programming",
    setup: "What's the best thing about a Boolean?",
    punchline: "Even if you're wrong, you're only off by a bit."
  },
  {
    id: 360,
    type: "general",
    setup: "Why do choirs keep buckets handy?",
    punchline: "So they can carry their tune"
  },
  {
    id: 334,
    type: "general",
    setup: "Why did the coffee file a police report?",
    punchline: "It got mugged."
  },
  {
    id: 102,
    type: "general",
    setup: "Did you hear the one about the guy with the broken hearing aid?",
    punchline: "Neither did he."
  }
];
//serves all our static files from the build directory.
app.use(express.static(path.join(__dirname, "build")));
app.get(express.json());

app.get("/api/", function(req, res) {
  res.json({ nodejs: "NodeJS works well" }).status(200);
});

app.get("/api/all", function(req, res) {
  res.json({ jokes }).status(200);
});

app.get("/api/:id", function(req, res) {
  let joke = jokes.filter((j) => j.id == req.params.id);
  if (joke.length < 1) {
    return res.json({ joke: { punchline: "nothing found" } });
  }
  res.json({ joke: joke[0] }).status(200);
});
// After all routes
// This code essentially serves the index.html file on any unknown routes.
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, function() {
  console.log(`PORT : ${PORT}`);
});
