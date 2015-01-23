// Each describe call matches up with one of the API methods listed
// on http://wiki.open311.org/GeoReport_v2/

var assert  = require('assert');
var server  = require('../bin/www');
var request = require('supertest');
var chai    = require('chai');
var should  = chai.should();
var expect  = chai.expect;
var should  = require('chai').should();


request = request('http://localhost:3000');

describe('GET Service List', function(){
	it('returns a list of services', function (done){
		request.get('/services.json')
			.expect(200)
			.end(function(err, res){
				res.body.should.be.an('array');
				done();
			});
	});

	it('returns valid services', function (done){
		request.get('/services.json')
			.expect(200)
			.end(function(err, res){
				res.body.should.be.an('array');
				var service = res.body[0];
				service.should.have.property('service_code');
				service.should.have.property('service_name');
				service.should.have.property('metadata');
				done();
			});
	});
});

describe('GET Service Definition', function(){
	it('returns 404 for non-existent service codes', function (done){
		request.get('/services/qqqqqldskjkljafsdlkjsad.json').expect(404, done);
	});

	it('rejects requests without a service code defined', function(done){
		request.get('/services').expect(400, done);
	});
});

describe('Home page', function(){
	it('should return "It\'s working!"', function (done){
		request.get('/').expect("It\'s working!", done);
	});
});
	
describe('POST service request', function(){

	var validCode = '1';

	var validJSON = {
		service_code: validCode,
		address_id: 1
	};


	// it('requires an api key', function (done){
		/*
			Somehow they request one
			I generate it, store it in the DB
			somehow they use it when their application requests json

		*/
	// })

	it('rejects lat alone', function (done){
		request.post('/requests.json').type('form').send({
			service_code: validCode,
			lat: '2323993'
		}).expect(400, done);
	});

	it('rejects long alone', function (done){
		request.post('/requests.json').type('form').send({
			service_code: validCode,
			long: '2323993'
		}).expect(400, done);
	});

	it('rejects no location', function (done){
		request.post('/requests.json').type('form').send({
			service_code: validCode
		}).expect(400, done);
	});

	it('accepts lat and long', function (done){
		request.post('/requests.json').type('form').send({
			service_code: validCode,
			long: 400,
			lat: 3003
		}).expect(200, done);
	});

	it('accepts an address id only', function (done){
		request.post('/requests.json').type('form').send({
			service_code: validCode,
			address_id: 400
		}).expect(200, done);
	});

	it('requires a service code', function (done){
		request.post('/requests.json').type('form').send({
			address_id: 400
		}).expect(400, done);
	});

	it('saves good requests', function (done){
		request.post('/requests.json')
			.type('form')
			.send(validJSON).expect(200, function(err, res){
				res.body.service_request_id.should.match(/([a-f]|[0-9])+/);
				done();
			});
	});

	it('should not return service_notice or account_id', function (done){
		request.post('/requests.json').type('form')
			.send(validJSON).expect(200, function(err, res){
				expect(res.body.service_notice).to.be.undefined();
				expect(res.body.account_id).to.be.undefined();
				done();
			});
	});

	it('returns a 404 for a bad service_code', function (done){
		request.post('/requests.json').type('form').send({
			service_code: 'No way this is a service code',
			address_id: 13123
		}).expect(404, done);
	});
});

describe('The server', function(){
	it('returns a 404 for not found pages', function (done){
		request.get('/whatever/asdfsadjksdfa.json').expect(404, done);
	});
});