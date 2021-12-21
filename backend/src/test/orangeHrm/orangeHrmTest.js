const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const {getSalesmenFromOrange} = require("../../services/orange-hrm-service");
const should = require('chai').should();
const expect = require('chai').expect;

const base = 'http://localhost:3000';

const responseObject = {
	statusCode: 200,
	headers: {
		'content-type' : 'application/json'
	}
};

const responseBody = [
	{ id: 1, firstname: 'Ameur', lastname: 'Khemissi' },
	{ id : 2, firstname: 'Omar', lastname: 'Guella' },
	{ id : 3, firstname: 'Svenja', lastname: 'Baehr' },
]

describe('OrangeHRM service', ()=> {
	describe('when not stubbed', () => {
		it('should return a list of all salesmen', async function() {
			const salesmen = await getSalesmenFromOrange();
			expect(salesmen.length).to.equal(5);
			salesmen.forEach((_s) => {
				_s.should.include.keys(
					'firstName', 'lastName', 'employeeId', 'code', 'unit'
					);
				expect(_s['unit']).to.equal('Sales');
			})
		})
	})

	describe('when stubbed', () => {
		let stub = undefined;

		beforeEach(()=> {
			stub = sinon.stub(request, 'get');
		});

		afterEach(()=> {
			request.get.restore();
		});

		describe('GET /api/orangehrm', () => {
			it('should return a list of all salesmen',function(done) {
				stub.yields(null, responseObject, JSON.stringify(responseBody));
				request.get(`${base}/api/orangehrm`, (err, res, body) => {
					res.statusCode.should.equal(200);
					body = JSON.parse(body);
					body.length.should.equal(3);
					expect(body[0]['firstname']).to.equal('Ameur');
					body.forEach((item, index) => {
						item.should.include.keys('id', 'firstname', 'lastname');
						expect(item['id']).to.equal(index+1);
					})
					done();
				})
			})
		})

	})
})
