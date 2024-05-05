import express from "express";

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

router.get("/lobby", isAuthenticated, (req, res) => {
  const user = Session.getCurrentUser(req);
  const gameId = 0;
  const errorMsg = req.flash("error");

  res.render("lobby", { user, gameId, errorMsg });
});

router.get("/game/:id", isAuthenticated, (req, res) => {
  /* 
    TODO

    1. update unogame.ejs

    2. lobby.ejs is updated with game list that allow user to join
       if game is not started, redirect user to /game/:id/wait

    3. add isUserInGame check later  
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
