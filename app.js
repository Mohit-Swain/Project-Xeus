const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const express_session = require('express-session');


const sequelize = require('./utils/database/sequelize_init');

// db modules
const user_model = require('./models/database/user_model');
const teacher_model = require('./models/database/teacher_model');
const student_model = require('./models/database/student_model');
const ta_model = require('./models/database/ta_model');

student_model.belongsTo(user_model, { foreignKey: 'user_id', onDelete: 'CASCADE' });
ta_model.belongsTo(user_model, { foreignKey: 'user_id', onDelete: 'CASCADE' });
teacher_model.belongsTo(user_model, { foreignKey: 'user_id', onDelete: 'CASCADE' });

const sess = {
  secret: 'a really long string for hash',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3 * 60 * 60 * 1000
  }
}
// Routes
const authRoutes = require('./routes/auth/user_auth');
const indexRouter = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express_session(sess));

app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use(authRoutes);

sequelize.sync({
   force: true
}).then(() => {
  console.log('model ready');
}).catch((err) => {
  console.log('db error' + err);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;