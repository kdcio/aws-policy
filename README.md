# AWS Policy Generator

[![ver](https://img.shields.io/npm/v/@kdcsoftware/aws-policy?style=for-the-badge)](https://www.npmjs.com/package/@kdcsoftware/aws-policy)
[![build](https://img.shields.io/github/workflow/status/kdcsoftware/aws-policy/build?style=for-the-badge)](https://github.com/kdcsoftware/aws-policy/actions?query=workflow%3Abuild)
[![codecov](https://img.shields.io/codecov/c/github/kdcsoftware/aws-policy?style=for-the-badge)](https://codecov.io/gh/kdcsoftware/aws-policy)
[![size](https://img.shields.io/bundlephobia/min/@kdcsoftware/aws-policy?style=for-the-badge)](https://bundlephobia.com/result?p=@kdcsoftware/aws-policy)
[![license](https://img.shields.io/github/license/kdcsoftware/aws-policy?style=for-the-badge)](https://github.com/kdcsoftware/aws-policy/blob/master/LICENSE)

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
