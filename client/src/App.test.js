import React from 'react';
import App from './App';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount, unmount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const mountApp = (props = {}, state= {}) => {
  const wrapper = mount(<App {...props} />);
  if (state) wrapper.setState({ ...state });
  return wrapper;
};

describe('<App/>', () => {
  it('renders without crashing', () => {
    mountApp();
  });

  it("Matches the snapshot", () => {
    const App = mountApp();
    expect(toJson(App)).toMatchSnapshot();
  });
})

