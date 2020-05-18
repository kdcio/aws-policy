# AWS Policy Generator

This package will generate AWS auth policy for API Gateway lambda authorizer.

## Install

```terminal
npm i @kdcsoftware/aws-policy
```

## Usage

```javascript
const generatePolicy = require('@kdcsoftware/aws-policy');

exports.handler = function (event) {
  const user = {
    name: 'Ian',
    username: 'ian',
    role: 'admin',
  };
  const resources = [
    'GET/users',
    'POST/users',
    'GET/users/*',
    'PUT/users/*',
    'DELETE/users/*',
  ];

  return generatePolicy({
    context: { ...user },
    principalId: user.username,
    effect: 'Allow',
    methodArn: event.methodArn,
    resources,
  });
};
```
