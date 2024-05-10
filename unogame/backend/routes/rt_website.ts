import express from "express";

import * as GamesDB from "../db/db_games";
import * as UserDB from "../db/db_users";
import { isAuthenticated } from "../middleware/check_auth";
import * as Session from "../middleware/session";

const router = express.Router();

router.get("/", (req, res) => {
  const errorMsg = req.flash("error");
  res.render("landing", { errorMsg });
});

router.get("/login", (req, res) => {
  const errorMsg = req.flash("error");
  res.render("login", { errorMsg });
});

router.get("/signup", (req, res) => {
  const errorMsg = req.flash("error");
  res.render("signup", { errorMsg });
});

router.get("/lobby", isAuthenticated, async (req, res) => {
  const user = Session.getCurrentUser(req);
  const gameId = 0;
  const errorMsg = req.flash("error");
  const availableGames = await GamesDB.getGamesCanJoin(user.id);
  const currentGames = await GamesDB.getGamesJoined(user.id);

  res.render("lobby", { user, gameId, errorMsg, availableGames, currentGames });
});

router.get("/game/:id", isAuthenticated, (req, res) => {
  /* 
    TODO

    1. update unogame.ejs

    2. update lobby.ejs with game list that allow user to join
       if game is not started, redirect user to /game/:id/wait

    3. add isUserInGame & other checks later  
    */
  const user = Session.getCurrentUser(req);
  const { id: gameId } = req.params;

  res.render("unogame", { gameId, user });
});

router.get("/game/:id/wait", isAuthenticated, async (req, res) => {
  /*
    TODO
    
    1. send invitation

    2. update wait room message via socket
    */

  const { id: gameId } = req.params;
  const user = Session.getCurrentUser(req);
  const playersList = await UserDB.getAllUsers();

  res.render("waitroom", { gameId, user, playersList });
});

export default router;
