import React from "react";
import { Result } from "./Result";
import Enzyme, { mount, unmount } from 'enzyme';
import toJson from 'enzyme-to-json';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const mountResult = (props = {}) => {
    const wrapper = mount(<Result {...props} />);
    return wrapper;
};

describe("<Results />", () => {
  it("Matches the snapshot", () => {
    const Result = mountResult();
    expect(toJson(Result)).toMatchSnapshot();
  });
});