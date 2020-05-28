global.chai = require('chai');
global.sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.assert = global.chai.assert;
global.expect = global.chai.expect;
global.should = global.chai.should;

global.sinon.assert.expose(assert, { prefix: '' });