jest.mock('../__mocks__/dynamodbclient');

import { ddb } from '../__mocks__/dynamodbclient';

import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

it('getting item from table', async () => {

  const mockValue = { documentNumber: '1', email: 'juandiego@gmail.com' };
  ddb.get = jest.fn().mockResolvedValue(mockValue);

  const Item = await ddb.get(marshall({ TableName: 'softek_backend_client', Key: { documentNumber: '1' } }))

  expect(Item).toEqual({
    documentNumber: '1',
    email: 'juandiego@gmail.com',
  });
});

it('should insert item into table', async () => {

  const mockValue = `{ documentNumber: '1', email: 'juandiego@gmail.com' }`;
  ddb.put = jest.fn().mockResolvedValue(mockValue);

  const newItem = await ddb.put(marshall({ documentNumber: '1', email: 'juandiego@gmail.com' }))

  const res = `Elemento creado `+ newItem

  expect(res).toEqual(`Elemento creado { documentNumber: '1', email: 'juandiego@gmail.com' }`);
});