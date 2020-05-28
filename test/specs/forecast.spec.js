const { mockRequest, mockResponse } = require('mock-req-res');
const mockForecast = require('../../src/utils/forecast')
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

    res = await mockForecast(20, 56);

    expect(res.status).to.eq(200);
    expect(res.data.latitude).to.eq(20);
    expect(res.data.longitude).to.eq(56);
  });
})