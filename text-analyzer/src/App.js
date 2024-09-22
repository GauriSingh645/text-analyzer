import React, { useState } from 'react';
import './App.css'; // for styling

function TextAnalyzer() {
  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  // Function to calculate unique words
  const getUniqueWordCount = (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    return uniqueWords.size;
  };

  // Function to calculate character count excluding spaces and punctuation
  const getCharacterCount = (text) => {
    const characters = text.replace(/[^a-zA-Z0-9]/g, '');
    return characters.length;
  };

  // Function to handle text replacement
  const handleReplace = () => {
    const newText = text.split(searchString).join(replaceString);
    setText(newText);

    // Highlighting replaced words (bonus feature)
    const highlighted = newText.split(replaceString).join(`<span class="highlight">${replaceString}</span>`);
    setHighlightedText(highlighted);
  };

  return (
    <div className="container">
      <h1>Real-Time Text Analyzer</h1>

      {/* Textarea for input */}
      <textarea
        className="textarea"
        rows="8"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here"
      />

      {/* Real-time statistics */}
      <div className="stats">
        <p><strong>Unique Word Count:</strong> {getUniqueWordCount(text)}</p>
        <p><strong>Character Count (excluding spaces and punctuation):</strong> {getCharacterCount(text)}</p>
      </div>

      {/* Input fields for string replacement */}
      <div className="replacement">
        <input
          type="text"
          placeholder="Search string"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace with"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
        />
        <button onClick={handleReplace}>Replace All</button>
      </div>

      {/* Display replaced text with highlights */}
      <div
        className="highlighted-text"
        dangerouslySetInnerHTML={{ __html: highlightedText || text }}
      />
    </div>
  );
}

export default TextAnalyzer;
