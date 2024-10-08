import { SocketEvent } from "../../../constants/socket_event";
import * as GamesDB from "../../db/db_games";
import { winningMsg } from "../chat/send_admin_msg";
import { getAndCastGameStatus } from "../games/gameplay";

export function gameListUpdate(req) {
  const io = req.app.get("io");
  io.emit(SocketEvent.LOBBY);
}

export async function gameStateUpdate(gameId, userId, req) {
  const io = req.app.get("io");

  const { room_name: currentRoom } = await GamesDB.getGameById(gameId);

  const status = await getAndCastGameStatus(gameId, userId);

  // Check if there is a winner
  for (const count of status.everyone_counts) {
    if (count.count == 0) {
      await winningMsg(gameId, count.id, req);
    }
  }

  /*
   emit game state update event to gameId
   client socket listen to this event then fetch data to update
*/
  io.emit(SocketEvent.UPDATE(gameId), {
    currentRoom,
    user_this_turn_name: status.user_this_turn_name,
    penalty: status.penalty,
  });
}
