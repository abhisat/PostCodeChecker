import React from 'react';
import App from './App';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, unmount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Select } from '@material-ui/core';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

const fakeResponse = {
  "localities": {
      "locality": [
          {
              "category": "Delivery Area",
              "id": 738,
              "latitude": -33.79667862,
              "location": "NORTH RYDE",
              "longitude": 151.1294983,
              "postcode": 2113,
              "state": "NSW"
          },
          {
              "category": "Delivery Area",
              "id": 737,
              "latitude": -33.78021361,
              "location": "MACQUARIE PARK",
              "longitude": 151.1270006,
              "postcode": 2113,
              "state": "NSW"
          },
          {
              "category": "Delivery Area",
              "id": 736,
              "latitude": -33.7769179,
              "location": "MACQUARIE CENTRE",
              "longitude": 151.121023,
              "postcode": 2113,
              "state": "NSW"
          },
          {
              "category": "Delivery Area",
              "id": 734,
              "latitude": -33.798787,
              "location": "BLENHEIM ROAD",
              "longitude": 151.133698,
              "postcode": 2113,
              "state": "NSW"
          },
          {
              "category": "Delivery Area",
              "id": 735,
              "latitude": -33.81060766,
              "location": "EAST RYDE",
              "longitude": 151.1363297,
              "postcode": 2113,
              "state": "NSW"
          }
      ]
  }
};

const props = {

}

const state = {
  postCode: "",
  suburb: "",
  region: "",
  result: "",
  error: false
}

const fetchData = jest.fn((data, handleResponse) => {handleResponse(JSON.stringify(fakeResponse))})

const mountApp = (props = {}, state= {}) => {
  const wrapper = mount(<App {...props}/>);
  if (state) wrapper.setState({ ...state });
  wrapper.instance().fetchData = fetchData
  wrapper.update()
  return wrapper;
};

describe('<App/>', () => {

  let App;

  beforeEach(() => {
    App = mountApp(props, state)
  });

  afterEach(() => {
    App.unmount();
  })

  it('renders without crashing', () => {
    mountApp(props, state);
  });

  it("Matches the snapshot", () => {
    expect(toJson(App)).toMatchSnapshot();
  });

  it('validates a correct address', () => {
    const postCode = "2113";
    const suburb = "North Ryde";
    const region = "NSW";
    App.find('input#postCode').simulate('change', {target: {value: postCode}});
    App.find('input#suburb').simulate('change', {target: {value: suburb}});
    App.find(Select).at(0).props().onChange({target: {value: region}})
    App.find('button#submit').simulate('submit');
    expect(App.find('p.result').length).toBe(1);
    expect(App.find('p.result').text()).toBe("The postcode 2113, suburb North Ryde, and state NSW entered are valid.")
  });

  it('checks if the postcode matches the suburb', () => {
    const postCode = "2113";
    const suburb = "Sydney";
    const region = "NSW"
    App.find('input#postCode').simulate('change', {target: {value: postCode}});
    App.find('input#suburb').simulate('change', {target: {value: suburb}});
    App.find(Select).at(0).props().onChange({target: {value: region}})
    App.find('button#submit').simulate('submit');
    expect(App.find('p.error').length).toBe(1);
    expect(App.find('p.error').text()).toBe("The postcode 2113 does not match the suburb Sydney.")
  });

  it('checks if the suburb matches the state', () => {
    const postCode = "2113";
    const suburb = "Macquarie Park";
    const region = "VIC";
    App.find('input#postCode').simulate('change', {target: {value: postCode}});
    App.find('input#suburb').simulate('change', {target: {value: suburb}});
    App.find(Select).at(0).props().onChange({target: {value: region}});
    App.find('button#submit').simulate('submit');
    expect(App.find('p.error').length).toBe(1);
    expect(App.find('p.error').text()).toBe("The suburb Macquarie Park does not exist in the state VIC.")
  });

  it('handles empty submit', () => {
    App.find('button#submit').simulate('submit');
    expect(App.find('p.error').length).toBe(1);
    expect(App.find('p.error').text()).toBe("Please enter a valid post code.")
  });

  it('handles empty postcode', () => {
    const postCode = "";
    const suburb = "Macquarie Park";
    const region = "VIC";
    App.find('input#postCode').simulate('change', {target: {value: postCode}});
    App.find('input#suburb').simulate('change', {target: {value: suburb}});
    App.find(Select).at(0).props().onChange({target: {value: region}});
    App.find('button#submit').simulate('submit');
    expect(App.find('p.error').length).toBe(1);
    expect(App.find('p.error').text()).toBe("Please enter a valid post code.")
  });

  it('handles empty suburb', () => {
    const postCode = "2113";
    const suburb = "";
    const region = "VIC";
    App.find('input#postCode').simulate('change', {target: {value: postCode}});
    App.find('input#suburb').simulate('change', {target: {value: suburb}});
    App.find(Select).at(0).props().onChange({target: {value: region}});
    App.find('button#submit').simulate('submit');
    expect(App.find('p.error').length).toBe(1);
    expect(App.find('p.error').text()).toBe("Please enter a valid suburb name.")
  });

  it('handles empty state', () => {
    const postCode = "2113";
    const suburb = "Macquarie Park";
    const region = "";
    App.find('input#postCode').simulate('change', {target: {value: postCode}});
    App.find('input#suburb').simulate('change', {target: {value: suburb}});
    App.find(Select).at(0).props().onChange({target: {value: region}})
    App.find('button#submit').simulate('submit');
    expect(App.find('p.error').length).toBe(1);
    expect(App.find('p.error').text()).toBe("Please enter the state.")
  });

  it('does not take non-digit postcodes', () => {
    const postCode = "test2113";
    const suburb = "Macquarie Park";
    const region = "VIC"
    App.find('input#postCode').simulate('change', {target: {value: postCode}});
    App.find('input#suburb').simulate('change', {target: {value: suburb}});
    App.find(Select).at(0).props().onChange({target: {value: region}})
    App.find('button#submit').simulate('submit');
    expect(App.find('p.error').length).toBe(1);
    expect(App.find('p.error').text()).toBe("Please enter a valid post code.")
  });

  it('does not take invalid suburb names', () => {
    const postCode = "2113";
    const suburb = "@q$Macquarie Park";
    const region = "VIC"
    App.find('input#postCode').simulate('change', {target: {value: postCode}});
    App.find('input#suburb').simulate('change', {target: {value: suburb}});
    App.find(Select).at(0).props().onChange({target: {value: region}})
    App.find('button#submit').simulate('submit');
    expect(App.find('p.error').length).toBe(1);
    expect(App.find('p.error').text()).toBe("Please enter a valid suburb name.")
  });

})

