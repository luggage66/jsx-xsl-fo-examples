/** @jsx XSLFO.createElement */
import XSLFO from 'jsx-xsl-fo';
import report from './addressList.report';
//import report from './report1';

// console.log(XSLFO.process(builtReport));

XSLFO.renderToStream(report, process.stdout);
//console.log(XSLFO.renderToString(report));
