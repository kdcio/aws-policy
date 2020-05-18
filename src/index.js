import debug from 'debug';

const log = debug('kdc:aws-policy');

/**
 * Resource format:
 * arn:aws:execute-api:{regionId}:{accountId}:{apiId}/{stage}/{httpVerb}/[{resource}/[{child-resources}]]
 *
 * Source: https://docs.aws.amazon.com/en_pv/apigateway/latest/developerguide/api-gateway-lambda-authorizer-output.html
 */
const getResource = ({ methodArn, resources }) => {
  const [, rootArn, appId, stage] = methodArn.match(
    /^(\S+:)([^/]+)\/([^/]+)\/([^/]+)\/(.*)/i
  );

  if (!resources) return null;
  if (!Array.isArray(resources)) return resources;

  return resources.map((r) => {
    return `${rootArn}${appId}/${stage}/${r}`;
  });
};

const generatePolicy = ({
  context,
  principalId,
  effect,
  methodArn,
  resources,
}) => {
  log(context, principalId, effect, methodArn, resources);
  const authResponse = {
    context: { ...context },
    principalId,
  };

  if (effect && methodArn) {
    const statementOne = {
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: getResource({ methodArn, resources }),
    };

    const policyDocument = {
      Version: '2012-10-17',
      Statement: [statementOne],
    };

    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
};

export default generatePolicy;
