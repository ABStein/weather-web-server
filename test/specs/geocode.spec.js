const { mockRequest, mockResponse } = require('mock-req-res');
const mockGeocode = require('../../src/utils/geocode')
const dotenv = require('dotenv').config('.env');


describe('Testing forecast API', function() {
  const sandbox = sinon.createSandbox();
  let res;


  beforeEach(function() {
    res = mockResponse();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should hit the api and get a 200', async function() {

    res = await mockGeocode('Boston');
    
    expect(res.status).to.eq(200);
  });
})