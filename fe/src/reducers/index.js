import {combineReducers} from "redux";
import player from "./player.reducer"
import host from "./host.reducer"
import register from "./register.reducer";
import login from "./login.reducer"
import home from "./home.reduce"

const myReducer =combineReducers({
    player,
    host,
    login,
    register,
    home
})
export default myReducer;