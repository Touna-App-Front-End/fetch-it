import FetchIt from '../src/fetch-it.js';
import 'isomorphic-fetch';

import './node.fix.js';


describe('Default instance post() method', () => {
  let url = 'http://example.com/page';
  let fetchStub;

  before(() => fetchStub = sinon.stub(global, 'fetch'));

  after(() => fetchStub.restore());

  beforeEach(() => fetchStub.reset());

  it('should call global.fetch with the same parameters', (done) => {
    let data = {
      data: 'data'
    };

    global.fetch(url, { body: global.JSON.stringify(data), method: 'POST' });
    FetchIt.post(url, data)
      .then(() => {
        let fetchItArgs = fetchStub.getCall(1).args;
        let fetchArgs = fetchStub.getCall(0).args;

        expect(fetchStub.callCount).to.be.equal(2);
        expect(fetchItArgs.length).to.be.equal(1);
        expect(fetchItArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(fetchItArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(fetchItArgs[0].method).to.be.equal('POST');
        return global.Promise.all([fetchItArgs[0].text(), fetchArgs[1].body]);
      })
      .then(([fetchItBody, fetchBody]) => {
        expect(fetchItBody).to.be.equal(fetchBody);

        done();
      })
      .catch(done.fail);
  });

  it('should not change the method if it is specified in options', (done) => {
    let options = {
      method: 'PUT',
    };

    let data = {
      data: 'data'
    };

    global.fetch(url, { body: global.JSON.stringify(data), method: 'POST' });
    FetchIt.post(url, data, options)
      .then(() => {
        let fetchItArgs = fetchStub.getCall(1).args;
        let fetchArgs = fetchStub.getCall(0).args;

        expect(fetchStub.callCount).to.be.equal(2);
        expect(fetchItArgs.length).to.be.equal(1);
        expect(fetchItArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(fetchItArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(fetchItArgs[0].method).to.be.equal('POST');
        return global.Promise.all([fetchItArgs[0].text(), fetchArgs[1].body]);
      })
      .then(([fetchItBody, fetchBody]) => {
        expect(fetchItBody).to.be.equal(fetchBody);

        done();
      })
      .catch(done.fail);
  });
});
