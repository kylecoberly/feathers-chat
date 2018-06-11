const assert = require('assert');
const app = require('../../src/app');

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('creates a user, encrypts password, and adds gravatar', async () => {
    const user = await app.service("users").create({
      email: "test@example.com",
      password: "secret"
    });

    assert.equal(user.avatar, "https://s.gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?s=60");
    assert.ok(user.password !== "secret");
  });

  it('removes password for external requests', async () => {
    const params = {provider: "rest"};

    const user = await app.service("users").create({
      email: "test2@example.com",
      password: "secret"
    }, params);

    assert.ok(!user.password);
  });
});
