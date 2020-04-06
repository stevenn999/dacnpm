import {combineReducers} from "redux";
import player from "./player.reducer"
import host from "./host.reducer"

const myReducer =combineReducers({
    player,
    host
})
export default myReducer;