/** @jsx XSLFO.createElement */
import XSLFO from 'jsx-xsl-fo';
import report from './addressList.report';
//import report from './report1';

const data = {
    names: ['Bob', 'Jimbo', 'Gerry']
};

var builtReport = report(data);
// console.log(builtReport);
//
// console.log(XSLFO.process(builtReport));

console.log('<?xml version="1.0" encoding="UTF-8"?>');
console.log(XSLFO.renderToString(builtReport));
