import React from 'react';
import Autosuggest from 'react-autosuggest';
import Link from 'next/link'
import theme from './SearchBar.module.scss'

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = async value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const info = {
    title: inputValue
  }

  if (inputLength < 3) {
    return [];
  } else {
    try {
      const res = await fetch('/api/findSuggestions', {
          method: 'post',
          body: JSON.stringify(info)
      })
      const response = await res.json()
      console.log(response)
      return response;
    } catch (error) {
      console.log(error)
      return [];
    }
  }

  // return inputLength < 3 ? [] : languages.filter(lang =>
  //   lang.name.toLowerCase().slice(0, inputLength) === inputValue
  // );
};

// const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
//     const router = useRouter()
//     console.log(suggestion)
//     router.push(`/title/${suggestion.imdbID}`)
// }

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.Title;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <Link href={`/title/${suggestion.imdbID}`}><button>{suggestion.Title}</button></Link>
);

class SearchBar extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };

  }



  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({ value }) => {
    this.setState({
      suggestions: await getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // const theme = {
    //   container: 'searchbar__container'
    // }

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Enter a Title name',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <div className="searchBar">
      <Autosuggest
        theme={theme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      </div>
    );
  }
}

export default SearchBar;