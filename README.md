# AWS Policy Generator

This package will generate AWS auth policy for API Gateway lambda authorizer.

[![ver](https://img.shields.io/npm/v/@kdcio/aws-policy)](https://www.npmjs.com/package/@kdcio/aws-policy)
[![build](https://img.shields.io/github/workflow/status/kdcio/aws-policy/build)](https://github.com/kdcio/aws-policy/actions?query=workflow%3Abuild)
[![codecov](https://img.shields.io/codecov/c/github/kdcio/aws-policy)](https://codecov.io/gh/kdcio/aws-policy)
[![size](https://img.shields.io/bundlephobia/min/@kdcio/aws-policy)](https://bundlephobia.com/result?p=@kdcio/aws-policy)
[![license](https://img.shields.io/github/license/kdcio/aws-policy)](https://github.com/kdcio/aws-policy/blob/master/LICENSE)

## Install

```terminal
npm i @kdcio/aws-policy
```

## Usage

```javascript
import generatePolicy from '@kdcio/aws-policy';

export const handler = (event) => {
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
