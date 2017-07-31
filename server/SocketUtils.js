
global.SocketUtils = {

    ReplyGoalScannedSuccessed: _replyGoalScannedSuccessed,
    ReplyGoalScannedFailed: _replyGoalScannedFailed
    
}

function _replyGoalScannedSuccessed(_socket,
				    _id_player,
				    _player_name,
				    _id_team_of_player,
				    _team_name,
				    _new_player_score,
				    _new_team_score,
				    _score_target,
				    _name_target)
{
    const data_to_reply = {
	status: "success",
	player_score: _new_player_score,
	team_score: _new_team_score,
	score_target: _score_target
    };

    const data_to_broadcast = {
	status: "success",
	team_id: _id_team_of_player,
	team_score: _new_team_score,
	score_target: _score_target,
	name_target: _name_target,
	player_name: _player_name,
	team_name: _team_name,
	time_event: "xxx heures"
    };
    
    _socket.emit('goal_scanned_answer', data_to_reply);
    _socket.broadcast.emit('goal_scanned_broadcast', data_to_broadcast);
}

function _replyGoalScannedFailed(_socket, _reason)
{
    const data_to_reply = {
	status: "failed",
	reason: _reason };
    _socket.emit('goal_scanned_answer', data_to_reply);
}

module.exports = SocketUtils;
