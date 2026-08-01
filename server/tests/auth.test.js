const test = require('node:test');
const assert = require('node:assert/strict');

let server;
let baseUrl;

async function postJson(path, payload) {
  const response = await fetch(baseUrl + path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return {
    status: response.status,
    body: await response.json(),
  };
}

async function getJson(path) {
  const response = await fetch(baseUrl + path);

  return {
    status: response.status,
    body: await response.json(),
  };
}

test.before(async () => {
  const app = require('../server');
  server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });

  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('patient registration and login work', async () => {
  const registerResult = await postJson('/api/auth/patient/register', {
    fullName: 'Jane Doe',
    email: 'jane.auth@example.com',
    password: 'secret123',
  });

  assert.equal(registerResult.status, 201);
  assert.equal(registerResult.body.success, true);

  const loginResult = await postJson('/api/auth/patient/login', {
    email: 'jane.auth@example.com',
    password: 'secret123',
  });

  assert.equal(loginResult.status, 200);
  assert.equal(loginResult.body.success, true);
  assert.ok(loginResult.body.token);
});

test('doctor registration and login work', async () => {
  const registerResult = await postJson('/api/auth/doctor/register', {
    fullName: 'Dr. Smith',
    email: 'doctor.auth@example.com',
    password: 'secure456',
    speciality: 'Cardiology',
    experience: 10,
  });

  assert.equal(registerResult.status, 201);
  assert.equal(registerResult.body.success, true);

  const loginResult = await postJson('/api/auth/doctor/login', {
    email: 'doctor.auth@example.com',
    password: 'secure456',
  });

  assert.equal(loginResult.status, 200);
  assert.equal(loginResult.body.success, true);
  assert.ok(loginResult.body.token);
});

test('patient registration details endpoint returns registered patients', async () => {
  const result = await getJson('/api/auth/patient/login');

  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  assert.ok(Array.isArray(result.body.registrations));
});

test('admin registration details endpoint returns patient and doctor registrations', async () => {
  const result = await getJson('/api/auth/admin/login');

  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  assert.ok(Array.isArray(result.body.registrations?.patients));
  assert.ok(Array.isArray(result.body.registrations?.doctors));
});
