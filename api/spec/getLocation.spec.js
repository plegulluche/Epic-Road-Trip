const axios = require("axios");
const getLocation = require("../controllers/mapController");


describe('getLocation function', () => {
    it('should return the correct data when a valid location is provided', async () => {
      const req = {
        body: {
          location: 'New York'
        }
      };
      const res = {
        json: jasmine.createSpy('json'),
        status: jasmine.createSpy('status')
      };
      spyOn(axios, 'get').and.returnValue(Promise.resolve({
        data: {
          results: [
            {
              geometry: {
                location: {
                  lat: 40.7127753,
                  lng: -74.0059728
                }
              }
            }
          ]
        }
      }));
      await getLocation(req, res);
      expect(axios.get).toHaveBeenCalledWith(`https://maps.googleapis.com/maps/api/geocode/json?&address=${req.body.location}&key=${process.env.GOOGLE_API_KEY}`);
      expect(res.json).toHaveBeenCalledWith({
        results: [
          {
            geometry: {
              location: {
                lat: 40.7127753,
                lng: -74.0059728
              }
            }
          }
        ]
      });
    });
  
    it('should return an error message when an invalid location is provided', async () => {
      const req = {
        body: {
          location: ''
        }
      };
      const res = {
        json: jasmine.createSpy('json'),
        status: jasmine.createSpy('status')
      };
      spyOn(axios, 'get').and.returnValue(Promise.reject(new Error('Invalid location')));
      await getLocation(req, res);
      expect(axios.get).toHaveBeenCalledWith(`https://maps.googleapis.com/maps/api/geocode/json?&address=${req.body.location}&key=${process.env.GOOGLE_API_KEY}`);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(new Error('Invalid location'));
    });
  });