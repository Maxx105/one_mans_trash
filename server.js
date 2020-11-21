const express = require("express");
// const socket = require("socket.io");
const mongoose = require("mongoose");
// const routes = require("./routes");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3001;
// const server = app.listen(PORT, function () {
//   console.log(`Listening on port ${PORT}`);
//   console.log(`http://localhost:${PORT}`);
// });

// // Static files
// app.use(express.static("public"));

// Socket setup
// const io = socket(server);

// io.on('connection', socket => {
//   const id = socket.handshake.query.id
//   socket.join(id)

//   socket.on('send-message', ({ recipients, text }) => {
//     recipients.forEach(recipient => {
//       const newRecipients = recipients.filter(r => r !== recipient)
//       newRecipients.push(id)
//       socket.broadcast.to(recipient).emit('receive-message', {
//         recipients: newRecipients, sender: id, text
//       })
//     })
//   })
// })

// Define middleware here
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('*', ( req, res ) => {
    res.sendFile( path.join( __dirname, 'client/build', 'index.html' ) ) 
  });
}

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/treasureDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


const router=require('./routes/api/user');
app.use('/api', router);
// const allRouter=require('./routes/api/all');
// app.use('/all', allRouter);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
