const requestLogger = (req, res, next) => {
    const requestInfo = {
        method: req.method,
        route: req.originalUrl,
    }

    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        requestInfo.body = {...req.body};
        if ('password' in requestInfo.body) {
            delete requestInfo.body.password;
        }
    }

    console.log(`Request Received: ${JSON.stringify(requestInfo)}`);
    next();
}

module.exports = {
    requestLogger,
}
