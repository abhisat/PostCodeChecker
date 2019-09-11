import React from "react";
import { PostCodeChecker } from "./PostCodeChecker";
import Enzyme, { shallow, unmount } from 'enzyme';
import toJson from 'enzyme-to-json';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const handlePostCodeChange = jest.fn()
const handleSuburbChange = jest.fn()
const handleRegionChange = jest.fn()
const handleSubmit = jest.fn()

const props = {
  postCode: "",
  suburb: "",
  region: "",
  onPostCodeChange: handlePostCodeChange,
  onSuburbChange: handleSuburbChange,
  onRegionChange: handleRegionChange,
  onSubmit: handleSubmit
}

const shallowMountPostCodeChecker = (props = {}) => {
    const wrapper = shallow(<PostCodeChecker {...props} />);
    return wrapper;
};

describe("<PostCodeChecker />", () => {
  let postCodeChecker;

  beforeEach(() => {
    postCodeChecker = shallowMountPostCodeChecker(props);
  });

  afterEach(() => {
    postCodeChecker.unmount();
  })

  it("Matches the snapshot", () => {
    expect(toJson(PostCodeChecker)).toMatchSnapshot();
  });

  it('handles postcode input', () => {
    postCodeChecker.find('#postCode').simulate('change');
    expect(handlePostCodeChange.mock.calls.length).toBe(1);
  });

  it('handles suburb input', () => {
    postCodeChecker.find('#suburb').simulate('change');
    expect(handleSuburbChange.mock.calls.length).toBe(1);
  });

  it('handles state input', () => {
    postCodeChecker.find('#region').simulate('change');
    expect(handleRegionChange.mock.calls.length).toBe(1);
  });

  it('handles submit', () => {
    postCodeChecker.find('form').simulate('submit',);
    expect(handleSubmit.mock.calls.length).toBe(1);
  });
});