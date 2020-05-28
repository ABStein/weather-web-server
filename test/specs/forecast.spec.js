const { mockRequest, mockResponse } = require('mock-req-res');
const mockForecast = require('../../src/utils/forecast')
const dotenv = require('dotenv').config('.env');


describe('Testing Weatherstack API', function() {
  const sandbox = sinon.createSandbox();
  let res;


  beforeEach(function() {
    res = mockResponse();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should hit the api and get a 200', function() {

    mockForecast('New York', (error, data) => {

      expect(data).to.include('New York');
    });
  });
})
