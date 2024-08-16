jest.mock('../../../__mocks__/dynamodbclient');

import { ddb } from '../../../__mocks__/dynamodbclient';

import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

it('clientsGetOne', async () => {

  const mockValue = { documentNumber: '1', email: 'juandiego@gmail.com' };
  ddb.get = jest.fn().mockResolvedValue(mockValue);

  const Item = await ddb.get(marshall({ TableName: 'softek_backend_client', Key: { documentNumber: '1' } }))

  expect(Item).toEqual({
    documentNumber: '1',
    email: 'juandiego@gmail.com',
  });
});
