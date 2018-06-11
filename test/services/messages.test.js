const assert = require('assert');
const app = require('../../src/app');

describe('\'messages\' service', () => {
  it('registered the service', () => {
    const service = app.service('messages');

    assert.ok(service, 'Registered the service');
  });

  it("creates and processes message, adds user information", async () => {
    const user = await app.service("users").create({
      email: "messagetest@example.com",
      password: "supersecret"
    });

    const params = {user};
    const message = await app.service("messages").create({
      text: "a test",
      additional: "should be removed"
    }, params);

    assert.equal(message.text, "a test");
    assert.equal(message.userId, user.id);
    assert.ok(!message.additional);
    assert.deepEqual(message.user, user);
  });
});
