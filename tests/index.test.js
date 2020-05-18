import generatePolicy from '../src';

describe('Generate Policy', () => {
  [
    {
      description: 'should generate policy',
      methodArn: 'arn:aws:execute-api:us-west-2:123456789012:abcdefghij/*/GET/',
      effect: 'Allow',
      user: { name: 'Ian', username: 'ian', role: 'admin' },
      resources: ['GET/users', 'POST/users'],
      expected: {
        context: {
          name: 'Ian',
          username: 'ian',
          role: 'admin',
        },
        principalId: 'ian',
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Allow',
              Resource: [
                'arn:aws:execute-api:us-west-2:123456789012:abcdefghij/*/GET/users',
                'arn:aws:execute-api:us-west-2:123456789012:abcdefghij/*/POST/users',
              ],
            },
          ],
        },
      },
    },
    {
      description: 'should generate policy without resource',
      methodArn: 'arn:aws:execute-api:us-west-2:123456789012:abcdefghij/*/GET/',
      effect: 'Allow',
      user: { name: 'Ian', username: 'ian', role: 'admin' },
      expected: {
        context: {
          name: 'Ian',
          username: 'ian',
          role: 'admin',
        },
        principalId: 'ian',
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Allow',
              Resource: null,
            },
          ],
        },
      },
    },
    {
      description: 'should generate policy with sting resource',
      methodArn: 'arn:aws:execute-api:us-west-2:123456789012:abcdefghij/*/GET/',
      effect: 'Allow',
      user: { name: 'Ian', username: 'ian', role: 'admin' },
      resources: 'GET/users',
      expected: {
        context: {
          name: 'Ian',
          username: 'ian',
          role: 'admin',
        },
        principalId: 'ian',
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Allow',
              Resource: 'GET/users',
            },
          ],
        },
      },
    },
    {
      description: 'should generate policy without effect',
      methodArn: 'arn:aws:execute-api:us-west-2:123456789012:abcdefghij/*/GET/',
      user: { name: 'Ian', username: 'ian', role: 'admin' },
      resources: 'GET/users',
      expected: {
        context: {
          name: 'Ian',
          username: 'ian',
          role: 'admin',
        },
        principalId: 'ian',
      },
    },
    {
      description: 'should generate policy without methodArn',
      effect: 'Allow',
      user: { name: 'Ian', username: 'ian', role: 'admin' },
      resources: 'GET/users',
      expected: {
        context: {
          name: 'Ian',
          username: 'ian',
          role: 'admin',
        },
        principalId: 'ian',
      },
    },
  ].forEach(({ description, methodArn, effect, user, resources, expected }) => {
    it(description, () => {
      const event = { methodArn };

      const policy = generatePolicy({
        context: { ...user },
        principalId: user.username,
        effect,
        methodArn: event.methodArn,
        resources,
      });
      expect(policy).toEqual(expected);
    });
  });
});
