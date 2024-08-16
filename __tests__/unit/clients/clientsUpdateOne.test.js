jest.mock('../../../__mocks__/dynamodbclient');

import { ddb } from '../../../__mocks__/dynamodbclient';

import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

it('clientsUpdateOne', async () => {

  const mockValue = `{ documentNumber: '3', email: 'juandiego@gmail.com' }`;
  ddb.put = jest.fn().mockResolvedValue(mockValue);

  const newItem = await ddb.put(marshall({ documentNumber: '3', email: 'juandiego@gmail.com' }))

  const res = `Elemento creado `+ newItem

  expect(res).toEqual(`Elemento creado { documentNumber: '3', email: 'juandiego@gmail.com' }`);
});