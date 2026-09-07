import { useState } from "react";

function CreateTicket({ onTicketCreated }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setMessage("Please enter both title and description.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:9096/api/tickets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: title,
            description: description
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      const newTicket = await response.json();

      setMessage("Ticket created successfully!");

      setTitle("");
      setDescription("");

      if (onTicketCreated) {
        onTicketCreated(newTicket);
      }

    } catch (error) {
      console.error(error);
      setMessage("Unable to create ticket.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-ticket">

      <h2>Create Support Ticket</h2>

      <p className="form-description">
        Submit a customer issue and let PromptDesk AI analyze it automatically.
      </p>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Ticket Title</label>

          <input
            type="text"
            placeholder="Example: Payment failed"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Ticket Description</label>

          <textarea
            placeholder="Describe the customer's problem..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="6"
          />
        </div>

        <button
          type="submit"
          className="create-button"
          disabled={loading}
        >
          {loading ? "Analyzing with AI..." : "Create Ticket"}
        </button>

      </form>

      {message && (
        <p className="form-message">
          {message}
        </p>
      )}

    </div>
  );
}

export default CreateTicket;