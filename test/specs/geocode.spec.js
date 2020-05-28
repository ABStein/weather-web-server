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

    mockGeocode('-73.989,40.733', (error, data) => {
      console.log(data);
      expect(data.location).to.eq('120 East 13th Street, New York, New York 10003, United States')
      expect(data.latitude).to.eq(40.7330031)
      expect(data.longitude).to.eq(-73.9888929)
    });
  });

  it('should hit the api with undefined results', function() {

    mockGeocode('aKHVASCJLHB', (error, data) => {
      expect(data).to.eq(undefined)
    });
  });
})