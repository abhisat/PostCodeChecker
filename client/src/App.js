import React, { Component } from 'react';
import './App.css';
import { PostCodeChecker } from './components/PostCodeChecker/PostCodeChecker';
import { Result } from './components/Result/Result';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      postCode: "",
      suburb: "",
      region: "",
      result: "",
      error: false
    }
    this.handlePostCodeChange = this.handlePostCodeChange.bind(this);
    this.handleSuburbChange = this.handleSuburbChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.suburbsList = [];
    this.regionList = [];
    this.errorText = "Sorry, there was an error. Please try again.";
  }
  handlePostCodeChange (e) {
    const postCode = e.target.value;
    if(isNaN(postCode)){
      this.setState(() => {
        return {
          result: "Please enter a valid post code.",
          error: true
        }
      })
    }
    else if(String(postCode).length <= 4){
      this.setState(() => {
        return {postCode: postCode};
      });
    }
  }

  handleSuburbChange (e) {
    let suburbRegEx =  /^[a-zA-Z\s]*$/; 
    const suburb = e.target.value;
    if(suburbRegEx.test(suburb)){
      this.setState(() => {
        return {suburb: suburb};
      });
    }
    else{
      this.setState(() => {
        return {
          result: "Please enter a valid suburb name.",
          error: true
        }
      })
    }
  }

  handleRegionChange (e) {
    const region = e.target.value;
    this.setState(() => {
      return {region: region};
    });
  }

  handleSubmit (e) {
    e.preventDefault()
    const { postCode, suburb, region } = this.state;
    if(this.onSubmitValidate(postCode, suburb, region) !== true){
      this.setState(() => {
        return {
          result: this.onSubmitValidate(postCode, suburb, region),
          error: true
        };
      });
    }
    else{
      const data = {
        q: this.state.postCode,
      }
      this.fetchData(data, this.handleResponse)
    }
  }

  onSubmitValidate(postCode, suburb, region) {
    if(postCode.length !== 4){
      return "Please enter a valid post code.";
    }
    if(suburb.length === 0){
      return "Please enter a valid suburb name.";
    }
    if(region.length === 0){
      return "Please enter the state.";
    }
    return true;
  }

  fetchData (data, handleResponse) {
    const url = new URL("https://cors-anywhere.herokuapp.com/" + process.env.REACT_APP_URL);
    Object.keys(data).forEach(query => url.searchParams.append(query, data[query]))
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url)
    xhr.setRequestHeader("auth-key", process.env.REACT_APP_APIKey)
    xhr.send()
    xhr.onload = () => {
      if (xhr.status !== 200) {
        this.setErrorState()
      } else { 
        handleResponse(xhr.responseText)
      }
    };
  }

  setErrorState(){
    this.setState(() => {
      return {
        result: this.errorText,
        error: true
      };
    })
  }

  handleResponse (res) {
    const { postCode, suburb, region } = this.state;
    let response = JSON.parse(res);
    this.suburbsList = [];
    this.regionList = [];
    if(response.error){
      this.setState(() => {
        return {
          result: this.errorText,
          error: true
        };
      })
    }
    else if(!response.localities){
      this.setState(() => {
        return {
          result: `The post code is not a valid Australian postcode.`,
          error: true
        };
      })
    }
    else {
      response.localities.locality.forEach((suburb) => {
        this.suburbsList.push(suburb.location);
        this.regionList.push(suburb.state)
      })
      if(this.isSuburbInPostCode(this.suburbsList, suburb) && this.isSuburbInState(this.regionList, region)){
        this.setState(() => {
          return {
            result: `The postcode ${postCode}, suburb ${suburb}, and state ${region} entered are valid.`,
            error: false
          };
        })
      }
      else if(!this.isSuburbInPostCode(this.suburbsList, suburb)){
        this.setState(() => {
          return {
            result: `The postcode ${postCode} does not match the suburb ${suburb}.`,
            error: true
          };
        })
      }
      else if(!this.isSuburbInState(this.regionList, region)){
        this.setState(() => {
          return {
            result: `The suburb ${suburb} does not exist in the state ${region}.`,
            error: true
          };
        })
      }
      else{
        this.setErrorState()
      }

    }
  }

  isSuburbInPostCode(suburbsList, suburb) {
    return suburbsList.includes(suburb.toUpperCase())
  }

  isSuburbInState(stateList, state){
    return stateList.includes(state.toUpperCase())
  }

  render () {
    
    const { postCode, suburb, region, result, error } = this.state;

    return (
      <React.Fragment>
        <PostCodeChecker
          postCode={postCode}
          suburb={suburb}
          region={region}
          onPostCodeChange={this.handlePostCodeChange}
          onSuburbChange={this.handleSuburbChange}
          onRegionChange={this.handleRegionChange}
          onSubmit={this.handleSubmit}
        />
        <Result resultText={result} error={error}/>
      </React.Fragment>
    );
  }
}

export default App;
