import React from "react";
import { Result } from "./Result";
import Enzyme, { mount, shallow } from 'enzyme';
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

const shallowMountResult = (props = {}) => {
    const wrapper = shallow(<Result {...props} />);
    return wrapper;
};

describe("<Results />", () => {

  it("Matches the snapshot", () => {
    const Result = shallowMountResult();
    expect(toJson(Result)).toMatchSnapshot();
  });

  it('displays errors in red', () => {
    const Result = shallowMountResult(errorProps);
    expect(Result.find('.error')).toHaveLength(1);
    expect(Result.find('.error').text()).toEqual('This is an error test.');
  });

  it('displays results in blue', () => {
    const Result = shallowMountResult(resultProps);
    expect(Result.find('.result')).toHaveLength(1);
    expect(Result.find('.result').text()).toEqual('This is a result test.');
  })
});