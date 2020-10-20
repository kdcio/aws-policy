# AWS Policy Generator

This package will generate AWS auth policy for [API Gateway lambda authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html).

[![ver](https://img.shields.io/npm/v/@kdcio/aws-policy)](https://www.npmjs.com/package/@kdcio/aws-policy) [![size](https://badgen.net/bundlephobia/minzip/@kdcio/aws-policy)](https://bundlephobia.com/result?p=@kdcio/aws-policy) [![build](https://img.shields.io/github/workflow/status/kdcio/aws-policy/build)](https://github.com/kdcio/aws-policy/actions?query=workflow%3Abuild) [![Known Vulnerabilities](https://snyk.io/test/github/kdcio/aws-policy/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kdcio/aws-policy?targetFile=package.json) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kdcio_aws-policy&metric=alert_status)](https://sonarcloud.io/dashboard?id=kdcio_aws-policy) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=kdcio_aws-policy&metric=code_smells)](https://sonarcloud.io/dashboard?id=kdcio_aws-policy) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=kdcio_aws-policy&metric=coverage)](https://sonarcloud.io/dashboard?id=kdcio_aws-policy) [![license](https://img.shields.io/github/license/kdcio/aws-policy)](https://github.com/kdcio/aws-policy/blob/master/LICENSE)

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

## Further Reading

[Output from an Amazon API Gateway Lambda authorizer](https://docs.aws.amazon.com/en_pv/apigateway/latest/developerguide/api-gateway-lambda-authorizer-output.html)