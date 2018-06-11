const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processMessage = require('../../src/hooks/process-message');

describe('\'process-message\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/messages', {
      async create(data) {
        return data;
      }
    });

    app.service('messages').hooks({
      before: processMessage()
    });
  });

  it('processes messages', async () => {
    const params = {
      user: {
        id: 1
      }
    };
    const message = await app.service("messages").create({
      text: "Hi",
      additional: "Should be removed"
    }, params);

    assert.equal(message.text, "Hi");
    assert.equal(message.userId, 1);
  });
});
