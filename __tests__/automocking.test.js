
jest.mock('../__mocks__/utils');

import utils from '../__mocks__/utils';

test('if utils mocked automatically', () => {

    expect(utils.authorize.mock).toBeTruthy();
    expect(utils.isAuthorized.mock).toBeTruthy();

    utils.authorize.mockReturnValue('token');
    utils.isAuthorized.mockReturnValue(true);
  
    expect(utils.authorize()).toBe('token');
    expect(utils.isAuthorized('not_wizard')).toBeTruthy();
});