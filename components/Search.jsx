import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import AutoSuggest from "react-autosuggest";
import Link from 'next/link'
import { useRouter } from 'next/router'


import theme from './SearchBar.module.scss'



function Search() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
  }

  const onSuggestionsFetchRequested = async ({ value }) => {
    setValue(value)
    setSuggestions(await getSuggestions(value))
    
  };

  const renderSuggestion = suggestion => (
    <Link href={`/title/${suggestion.imdbID}`}><span >{suggestion.Title}</span></Link>
  );

  const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    // const router = useRouter()
    // console.log(suggestion)
    // router.push(`/title/${suggestion.imdbID}`)
}
  
  return (
    <div>
      <AutoSuggest
        theme={theme}
        suggestions={suggestions}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        getSuggestionValue={suggestion => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: "Enter a Title name",
          value: value,
          onChange: (_, { newValue, method }) => {
            setValue(newValue);
          }
        }}
        highlightFirstSuggestion={true}
      />
    </div>
  )
}

export default Search
