import { useEffect, useState } from "react";
import "./App.css";
import axios, { all } from "axios";
import { MagnifyingGlass, RotatingLines } from "react-loader-spinner";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtereddata, setFilteredData] = useState([]);
  const [dropdownValue, setDropDownValue] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      console.log(response.data);
      setData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    });
  }, []);

  function handleChange(e) {
    setSearchTerm(e.target.value);
    const newlist = data.filter((item) => {
      if (dropdownValue === "complete") {
        return (
          item.title.toLowerCase().includes(e.target.value) &&
          item.completed === true
        );
      } else if (dropdownValue === "Incomplete") {
        return (
          item.title.toLowerCase().includes(e.target.value) &&
          item.completed === false
        );
      } else {
        return item.title.toLowerCase().includes(e.target.value);
      }
    });

    setFilteredData(newlist);
  }

  function handleDropDown(e) {
    setDropDownValue(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "ALL" && searchTerm === "") {
      setFilteredData(data);
    } else {
      const newlist = data.filter((item) => {
        if (e.target.value === "complete") {
          return (
            item.completed === true &&
            item.title.toLowerCase().includes(searchTerm)
          );
        } else if (e.target.value === "Incomplete") {
          return (
            item.completed === false &&
            item.title.toLowerCase().includes(searchTerm)
          );
        } else {
          return item.title.toLowerCase().includes(searchTerm);
        }
      });

      setFilteredData(newlist);
    }
  }

  return (
    <div className="App">
      <h1>API CALL</h1>
      {loading ? (
        <>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </>
      ) : (
        <>
          <div className="search-container">
            <input
              type="text"
              onChange={handleChange}
              placeholder="Search Title"
            ></input>

            <select value={dropdownValue} onChange={handleDropDown}>
              <option value="ALL">ALL</option>
              <option value="complete">complete</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>

          {filtereddata.length ? (
            <table>
              <tr>
                <th>USER ID</th>
                <th>ID</th>
                <th>TITLE</th>
                <th>STATUS</th>
              </tr>
              {filtereddata.map((item) => {
                return (
                  <tr>
                    <td>{item.userId}</td>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.completed ? "complete" : "Incomplete"}</td>
                  </tr>
                );
              })}
            </table>
          ) : (
            <h1>NO MATCH FOUND!</h1>
          )}
        </>
      )}
    </div>
  );
}

export default App;
