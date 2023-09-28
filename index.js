import express from "express";
import cors from "cors";
import UsersRoute from "./routes/UserRoute.js";
import AutomationRoute from "./routes/AutomationRoute.js";
import UserApi from "./routes/UserApiRoute.js"


const app = express();
app.use(cors());
app.use(express.json());
app.use(UsersRoute);
app.use(UserApi);
app.use(AutomationRoute);





// app.get('/', function(request, response) {
//     res.sendFile(path.join(__dirname, '/public', 'index.html'));
// })
app.listen(5000, ()=> console.log('Server up and running 5000...'));