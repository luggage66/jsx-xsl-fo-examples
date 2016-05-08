import * as http from 'http';
import { spawn }  from 'child_process';
import XSLFO, { Component } from './xslfo';
import report from './report';


const server = http.createServer((req, res) => {

    var builtReport = report();

    res.writeHead(200, { 'Content-Type': 'application/pdf' });

    let fopProcess = spawn('fop', ['-fo', '-', '-pdf', '-']);
    fopProcess.stdout.pipe(res);

    fopProcess.stdin.write('<?xml version="1.0" encoding="UTF-8"?>');
    fopProcess.stdin.write(XSLFO.renderToString(builtReport));
    fopProcess.stdin.end();

    fopProcess.on('close', (code) => {
        res.end();
    });


});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(3004);
