exports.runProxyServer = function(Agent, httpProxy) {

        Agent =  new Agent({
        maxSockets: 100,
        keepAlive: true,
        maxFreeSockets: 10,
        keepAliveMsecs:100000,
        timeout: 6000000,
        keepAliveTimeout: 90000 // free socket keepalive for 90 seconds
    });

    var proxy = httpProxy.createProxy({ target: 'http://localhost:4640', agent: Agent});

    // Modify headers of the request before it gets sent
    proxy.on('proxyRes', function (proxyRes) {
        var key = 'www-authenticate';
        proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
    });
    
    require('http').createServer(function (req, res) {
        proxy.web(req, res);
    }).listen(4000);
}