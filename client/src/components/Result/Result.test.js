import React from "react";
import { Result } from "./Result";
import Enzyme, { mount, unmount } from 'enzyme';
import toJson from 'enzyme-to-json';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const errorProps = {
  error: true,
  resultText: 'This is an error test.'
}

const resultProps = {
  error: false,
  resultText: 'This is a result test.'
}

const mountResult = (props = {}) => {
    const wrapper = mount(<Result {...props} />);
    return wrapper;
};

describe("<Results />", () => {
  it("Matches the snapshot", () => {
    const Result = mountResult();
    expect(toJson(Result)).toMatchSnapshot();
  });

  it('displays errors in red', () => {
    const Result = mountResult(errorProps);
    expect(Result.find('p.error')).toHaveLength(1);
    expect(Result.find('p.error').text()).toEqual('This is an error test.');
  });

  it('displays results in blue', () => {
    const Result = mountResult(resultProps);
    expect(Result.find('p.result')).toHaveLength(1);
    expect(Result.find('p.result').text()).toEqual('This is a result test.');
  })
});