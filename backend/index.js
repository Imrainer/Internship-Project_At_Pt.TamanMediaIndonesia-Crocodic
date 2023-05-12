import express from "express";
import cors from "cors";
import UsersRoute from "./routes/UserRoute.js";
import GroupRoute from "./routes/GroupRoute.js";
import AutomationRoute from "./routes/AutomationRoute.js";
import UserApi from "./routes/UserApiRoute.js"
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(UsersRoute);
app.use(UserApi);
app.use(AutomationRoute);
app.use(GroupRoute);

// app.get('/', function(request, response) {
//     res.sendFile(path.join(__dirname, '/public', 'index.html'));
// })
app.listen(5000, ()=> console.log('Server up and running 5000...'));