import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Form() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  if (status === "success") {
    return <h1>That's right!</h1>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>My Name Is?</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
        />
        <br />

        <button
          disabled={answer.length === 0 || status === "submitting"}
          className="btn btn-warning mx-2 "
        >
          Submit
        </button>
        {error !== null && <p className="Error">{error.message}</p>}
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== "asad";
      if (shouldError) {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}

// import { useState } from "react";
// import { Dropdown } from "react-bootstrap";
// import { CheckCircle } from "react-bootstrap-icons";

// function Selector({ data, selected, setSelected }) {
//   const [query, setQuery] = useState("");
//   const filteredPeople =
//     query === ""
//       ? data
//       : data.filter((person) =>
//           person.name
//             .toLowerCase()
//             .replace(/\s+/g, "")
//             .includes(query.toLowerCase().replace(/\s+/g, ""))
//         );

//   return (
//     <div className="w-72">
//       <Dropdown>
//         <Dropdown.Toggle variant="light" id="dropdown-basic">
//           {selected ? selected.name : "Select an option"}
//         </Dropdown.Toggle>

//         <Dropdown.Menu>
//           <div className="p-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search..."
//               onChange={(event) => setQuery(event.target.value)}
//             />
//           </div>
//           {filteredPeople.length === 0 && query !== "" ? (
//             <Dropdown.ItemText>No results found.</Dropdown.ItemText>
//           ) : (
//             filteredPeople.map((person) => (
//               <Dropdown.Item
//                 as="button"
//                 key={person.id}
//                 onClick={() => setSelected(person)}
//                 className={`d-flex justify-content-between align-items-center ${
//                   selected?.id === person.id ? "bg-primary text-white" : ""
//                 }`}
//               >
//                 <span>{person.name}</span>
//                 {selected?.id === person.id && (
//                   <CheckCircle className="text-white" />
//                 )}
//               </Dropdown.Item>
//             ))
//           )}
//         </Dropdown.Menu>
//       </Dropdown>
//     </div>
//   );
// }

// export default Selector;
