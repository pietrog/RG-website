
global.HttpHandler = {
    errorHTTPCode: 500,
    
    answerJSonSuccess: AnswerJSONSuccess,
    answerJSonError: AnswerJSONError,
    answerJSonFailure: AnswerJSONFailure,
    answerJSonWithHTTPCode: AnswerJSonwithHTTPCode,
    
}


/**
 * Send back json to the client with 200 status code
 * A success parameter set to true and data in data field
 */
function AnswerJSONSuccess(response, data){
    response.json(data);    
}

/**
 * Send back json to the client with an error code (error from the server)
 * A success parameter set to false and data 
 */
function AnswerJSONError(response, data){
    response.status(HttpHandler.errorHTTPCode).json(data);    
}

/**
 * Send back a json to the client with 200 status code
 * But a failure occured, for instance during model validation
 * Use this one when client sent wrong informations
 */
function AnswerJSONFailure(res, data){
    res.json(data);
}

/**
 * Send a response with given http code
 */
function AnswerJSonwithHTTPCode(res, httpcode, data){
    res.status(httpcode).json(data);
}

module.exports = HttpHandler;
