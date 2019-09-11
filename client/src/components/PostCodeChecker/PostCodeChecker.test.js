import React from "react";
import { PostCodeChecker } from "./PostCodeChecker";
import Enzyme, { mount, shallow } from 'enzyme';
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

const mountPostCodeChecker = (props = {}) => {
    const wrapper = shallow(<PostCodeChecker {...props} />);
    return wrapper;
};

describe("<PostCodeChecker />", () => {
  it("Matches the snapshot", () => {
    const PostCodeChecker = mountPostCodeChecker(props);
    expect(toJson(PostCodeChecker)).toMatchSnapshot();
  });

  it('handles postcode input', () => {
    const PostCodeChecker = mountPostCodeChecker(props);
    PostCodeChecker.find('#postCode').simulate('change');
    expect(handlePostCodeChange.mock.calls.length).toBe(1);
  });

  it('handles suburb input', () => {
    const PostCodeChecker = mountPostCodeChecker(props);
    PostCodeChecker.find('#suburb').simulate('change');
    expect(handleSuburbChange.mock.calls.length).toBe(1);
  });

  it('handles state input', () => {
    const PostCodeChecker = mountPostCodeChecker(props);
    PostCodeChecker.find('#region').simulate('change');
    expect(handleRegionChange.mock.calls.length).toBe(1);
  });

  it('handles submit', () => {
    const PostCodeChecker = mountPostCodeChecker(props);
    PostCodeChecker.find('form').simulate('submit');
    expect(handleSubmit.mock.calls.length).toBe(1);
  });
});