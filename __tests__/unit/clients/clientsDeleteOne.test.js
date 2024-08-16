jest.mock('../../../__mocks__/dynamodbclient');

import { ddb } from '../../../__mocks__/dynamodbclient';

import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

it('clientsCreate', async () => {

  const mockValue = `sucess`;
  ddb.DeleteCommand = jest.fn().mockResolvedValue(mockValue);

  const deletedItem = await ddb.DeleteCommand(marshall({ TableName: 'softek_backend_client', Key: { documentNumber: '1' } }))

  const res = `sucess`

  expect(deletedItem).toEqual(res);
});