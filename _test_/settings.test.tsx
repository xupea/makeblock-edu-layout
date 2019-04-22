import React from 'react';
import { mount } from 'enzyme';
import BasicLayout from '../src/BasicLayout';
import 'jsdom-global/register';

describe('BasicLayout', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: false,
          addListener: function() {},
          removeListener: function() {},
        };
      }),
    });
  });

  it('set title', () => {
    const wrapper = mount(<BasicLayout settings={{ title: 'test-title' }} />);
    let title = wrapper.find('#logo').text();
    expect(title).toEqual('test-title');
    wrapper.setProps({
      settings: {
        title: 'Ant Design Pro',
      },
    });
    title = wrapper.find('#logo').text();
    expect(title).toEqual('Ant Design Pro');
  });
});