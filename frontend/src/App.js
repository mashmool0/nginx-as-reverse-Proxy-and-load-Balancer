import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(null);

  const fetchHelloWorld = async () => {
    try {
      const response = await fetch("https://localhost/api/hello/");
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const calculateSum = async () => {
    const formData = new FormData();
    formData.append("num1", num1);
    formData.append("num2", num2);

    try {
      const response = await fetch("https://localhost/api/calculate/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Django + React Demo</h1>

        <div className="section">
          <button onClick={fetchHelloWorld}>Fetch Hello World</button>
          {message && <p>Message from backend: {message}</p>}
        </div>

        <div className="section">
          <h2>Calculator</h2>
          <div>
            <label>
              Number 1:
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Number 2:
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            </label>
          </div>
          <button onClick={calculateSum}>Calculate Sum</button>
          {result !== null && <p>Result: {result}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
