const { mockRequest, mockResponse } = require('mock-req-res');
const mockGeocode = require('../../src/utils/geocode')
const dotenv = require('dotenv').config('.env');


describe('Testing Mapbox API', function() {
  const sandbox = sinon.createSandbox();
  let res;


  beforeEach(function() {
    res = mockResponse();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should hit the api and get a 200', function() {

    mockGeocode('Boston', (error, data) => {
      console.log(data)
      expect(data.location).to.eq('Boston, Massachusetts, United States')
      expect(data.latitude).to.eq(42.3605)
      expect(data.longitude).to.eq(-71.0596)
    });
  });
})