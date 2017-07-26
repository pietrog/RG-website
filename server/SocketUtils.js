
global.SocketUtils = {

    ReplyGoalScannedSuccessed: _replyGoalScannedSuccessed,


    BroadcastGoalScannedSuccessed: broadcastGoalScannedSuccessed,
    AnswerGoalScannedFailed: answerGoalScannedFailed,
    
    answerSocketSuccess: AnswerJSONSuccess,
    answerSocketFailed: AnswerJSONError,
    ReturnError: return_error,
    ReturnSuccess: return_success
}

function broadcastGoalScannedSuccessed(socket, _team_id, _team_score)
{
    console.log('Broadcast goal scanned succefully');
    const data = { team_id: _team_id, team_score: _team_score};

}

function _replyGoalScannedSuccessed(socket, _player_score, _team_score, _team_id)
{
    const data = { player_score: _player_score, team_score: _team_score};
    socket.emit('goal_scanned_answer', data);
    const data_b = { content: 'success', team_id: _team_id, team_score: _team_score};
    socket.broadcast.emit('goal_scanned_broadcast', data_b);
}

function answerGoalScannedFailed(socket, _reason)
{
    socket.emit('goal_scanned_answer', SocketUtils.answerSocketFailed(_reason));
}


/**
 * Send back json to the client with 200 status code
 * A success parameter set to true and data in data field
 */
function AnswerJSONError(_reason){
    return { content: "failed", reason: _reason};
}

/**
 * Send back json to the client with an error code (error from the server)
 * A success parameter set to false and data 
 */
function AnswerJSONSuccess(_data){
    return { content: "success", data: _data};
}


function return_error()
{
    return { result: 'failed' };
}

function return_success(_data)
{
    return { result: 'success', data: _data };
}


module.exports = SocketUtils;
