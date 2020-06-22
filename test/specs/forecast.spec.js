const { mockRequest, mockResponse } = require('mock-req-res');
const mockForecast = require('../../src/utils/forecast');
const { expect } = require('chai');
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

  it('should get a response with the weather object', function() {

    mockForecast('New York', (error, data) => {
      expect(data).to.have.all.keys('observation_time', 'temperature', 'weather_code', 'weather_icons', 'weather_descriptions', 'wind_speed', 'wind_degree', 'wind_dir', 'pressure', 'precip', 'humidity', 'cloudcover', 'feelslike', 'uv_index', 'visibility', 'is_day'); 
    });
  });
})
