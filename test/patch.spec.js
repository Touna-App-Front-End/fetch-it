import FetchIt from '../src/fetch-it.js';
import 'isomorphic-fetch';

describe('Default instance patch() method', () => {
  let url = 'http://example.com/page';
  let fetchStub;

  before(() => fetchStub = sinon.stub(global, 'fetch'));

  after(() => fetchStub.restore());

  beforeEach(() => fetchStub.reset());

  it('should call global.fetch with the same parameters', (done) => {
    let data = {
      data: 'data'
    };

    global.fetch(url, { body: global.JSON.stringify(data), method: 'PATCH' });
    FetchIt.patch(url, data)
      .then(() => {
        let fetchItArgs = fetchStub.getCall(1).args;
        let fetchArgs = fetchStub.getCall(0).args;

        expect(fetchStub.callCount).to.be.equal(2);
        expect(fetchItArgs.length).to.be.equal(1);
        expect(fetchItArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(fetchItArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(fetchItArgs[0].method).to.be.equal('PATCH');
        expect(fetchItArgs[0]._bodyText).to.be.equal(fetchArgs[1].body);
        expect(fetchItArgs[0]._bodyText).to.be.equal(global.JSON.stringify(data));
        expect(fetchItArgs[0].headers.getAll().length).to.be.equal(0);

        done();
      });
  });

  it('should not change the method if it is specified in options', (done) => {
    let options = {
      method: 'POST',
    };

    let data = {
      data: 'data'
    };

    global.fetch(url, { body: global.JSON.stringify(data), method: 'PATCH' });
    FetchIt.patch(url, data, options)
      .then(() => {
        let fetchItArgs = fetchStub.getCall(1).args;
        let fetchArgs = fetchStub.getCall(0).args;

        expect(fetchStub.callCount).to.be.equal(2);
        expect(fetchItArgs.length).to.be.equal(1);
        expect(fetchItArgs[0].url).to.be.equal(fetchArgs[0]);
        expect(fetchItArgs[0].method).to.be.equal(fetchArgs[1].method);
        expect(fetchItArgs[0].method).to.be.equal('PATCH');
        expect(fetchItArgs[0]._bodyText).to.be.equal(fetchArgs[1].body);
        expect(fetchItArgs[0]._bodyText).to.be.equal(global.JSON.stringify(data));
        expect(fetchItArgs[0].headers.getAll().length).to.be.equal(0);

        done();
      });
  });
});
