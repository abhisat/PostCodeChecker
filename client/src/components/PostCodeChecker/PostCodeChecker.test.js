import React from "react";
import { PostCodeChecker } from "./PostCodeChecker";
import Enzyme, { mount, unmount } from 'enzyme';
import toJson from 'enzyme-to-json';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const mountPostCodeChecker = (props = {}) => {
    const wrapper = mount(<PostCodeChecker {...props} />);
    return wrapper;
};

describe("<PostCodeChecker />", () => {
  it("Matches the snapshot", () => {
    const PostCodeChecker = mountPostCodeChecker();
    expect(toJson(PostCodeChecker)).toMatchSnapshot();
  });
});