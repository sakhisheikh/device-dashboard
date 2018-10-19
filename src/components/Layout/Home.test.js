import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

function setup() {
  const props = {
    readings: [],
  };
  const wrapper = shallow(<Home.WrappedComponent {...props} />).dive();
  return { props, wrapper };
}

describe('Layout Home', () => {
  it('Should render Home component', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
});
