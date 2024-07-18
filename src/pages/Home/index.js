import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import '../../assets/main.css';

function Main() {
  const host = process.env.REACT_APP_HOST;
  const port = process.env.REACT_APP_PORT;

  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState(false);
  const [query, setQuery] = useState('');
  const lastElementRef = useRef(null);

  // Handle the send button click event
  const handleSend = () => {
    if (status === true) {
      return;
    }

    // Check if query is empty
    if (query.trim().length === 0) {
      return;
    }
    sendQuestion();
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      // Prevent the default newline action
      event.preventDefault();
      handleSend();
    }
  };

  const sendQuestion = async () => {
    if (query.trim().length === 0) {
      return;
    }

    // Get loading-gif DOM element
    const loading = document.getElementsByClassName("overlay")[0];
    loading.style.visibility = "visible"; // Set visible true
    setStatus(true); // Lock status

    // Get backend-end API endpoint
    const url_path = `http://${host}:${port}/process`;

    // Prepare API payload
    const formData = new FormData();
    formData.append("prompt", JSON.stringify({
      content: query,
    }));

    try {
      const response = await axios.post(
        url_path,
        formData,
        {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      );

      if (response.data.columns && response.data.rows) {
        setHistory(prevHistory => [
          ...prevHistory,
          {
            question: query,
            answer: response.data,
            message: ''
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setHistory(prevHistory => [
        ...prevHistory,
        {
          question: query,
          answer: null,
          message: 'Sorry, no matching result!',
        }
      ]);
    }

    loading.style.visibility = "hidden"; // Hide loading gif
    setQuery(''); // Clear query
    setStatus(false); // Unlock status
  };

  // Scroll to the last element whenever history updates
  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return (
    <div className="main-page">
      <div id="chats" className="chat-history">
        {history.length > 0 && (
          history.map((item, index) => (
            <div 
              className="question-container" 
              key={index} 
              ref={index === history.length - 1 ? lastElementRef : null}
            >
              <div className="question">
                Q: {item.question}
              </div>
              {item.message.length > 0 ? (
                <div className="answer">
                  E: {item.message}
                </div>
              ) : (item.answer === null || item.answer.rows.length === 0) ? (
                <div className="answer">
                  A: No matched data!
                </div>
              ) : (
                <div>
                  <table>
                    <thead>
                      <tr>
                        {item.answer.columns.map((col, index) => (
                          <th key={index}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.answer.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {item.answer.columns.map((col, colIndex) => (
                            <td key={colIndex}>{row[col]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="chat-box">
        <div className="input-box">
          <input
            className="text-box"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleEnterPress}
            placeholder="Enter your query here"
          />
          <button
            className="btn-primary"
            onClick={handleSend}
          > 
            Send
          </button>
        </div>
      </div>
      <div className="overlay" style={{ visibility: 'hidden' }}>
        <div className="loading-gif"></div>
      </div>
    </div>
  );
}

export default Main;
