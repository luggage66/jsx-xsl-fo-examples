import * as http from 'http';
import { spawn }  from 'child_process';
import XSLFO, { Component } from 'jsx-xsl-fo';
import report from './addressList.report';


const server = http.createServer((req, res) => {

    var builtReport = report;

    res.writeHead(200, { 'Content-Type': 'application/pdf' });

    let fopProcess = spawn('fop', ['-fo', '-', '-pdf', '-']);

    fopProcess.stdout.pipe(res);
    XSLFO.renderToStream(builtReport, fopProcess.stdin);
    fopProcess.stdin.end();

    fopProcess.on('close', (code) => {
        res.end();
    });
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(3004);
