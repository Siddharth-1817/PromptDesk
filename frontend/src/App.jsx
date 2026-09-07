import { useEffect, useState } from "react";
import "./App.css";
import { getTickets } from "./ticketService";
import CreateTicket from "./CreateTicket";

function App() {

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState("dashboard");

  // Selected ticket for details
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Tickets page states
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  // Load tickets
  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {

    try {

      const data = await getTickets();

      setTickets(data);
      setError("");

    } catch (err) {

      setError("Unable to connect to the backend.");

      console.error(err);

    } finally {

      setLoading(false);

    }
  }

  // Dashboard statistics
  const highPriorityCount = tickets.filter(
    ticket => ticket.priority === "HIGH"
  ).length;

  const negativeSentimentCount = tickets.filter(
    ticket => ticket.sentiment === "NEGATIVE"
  ).length;

  // When ticket is created
  function handleTicketCreated(newTicket) {

    setTickets(prevTickets => [
      ...prevTickets,
      newTicket
    ]);

    setPage("dashboard");
  }

  // Open ticket details
  function openTicket(ticket) {

    setSelectedTicket(ticket);

    setPage("details");
  }

  // Delete ticket
  async function deleteTicket(id) {

    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmed) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:9096/api/tickets/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete ticket");
      }

      // Remove ticket from frontend
      setTickets(prevTickets =>
        prevTickets.filter(ticket => ticket.id !== id)
      );

      // If deleted ticket was open
      if (selectedTicket?.id === id) {
        setSelectedTicket(null);
        setPage("tickets");
      }

      alert("Ticket deleted successfully.");

    } catch (error) {

      console.error(error);

      alert("Unable to delete ticket.");

    }
  }

  // Search + Priority Filter
  const filteredTickets = tickets.filter(ticket => {

    const matchesSearch =
      ticket.title?.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(search.toLowerCase()) ||
      ticket.category?.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "ALL" ||
      ticket.priority === priorityFilter;

    return matchesSearch && matchesPriority;

  });

  return (

    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <h2>PromptDesk</h2>

        <nav>

          <button
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => setPage("tickets")}
          >
            Tickets
          </button>

          <button
            onClick={() => setPage("create")}
          >
            Create Ticket
          </button>

        </nav>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="main-content">


        {/* ================================================= */}
        {/* DASHBOARD */}
        {/* ================================================= */}

        {page === "dashboard" && (

          <>

            <header>

              <h1>Dashboard</h1>

              <p>
                AI-Powered Customer Support Management
              </p>

            </header>


            {loading && (
              <p>Loading tickets...</p>
            )}


            {error && (
              <p>{error}</p>
            )}


            {!loading && !error && (

              <>


                {/* ================= STATISTICS ================= */}

                <section className="stats">

                  <div className="card">

                    <h3>
                      Total Tickets
                    </h3>

                    <p>
                      {tickets.length}
                    </p>

                  </div>


                  <div className="card">

                    <h3>
                      High Priority
                    </h3>

                    <p>
                      {highPriorityCount}
                    </p>

                  </div>


                  <div className="card">

                    <h3>
                      Negative Sentiment
                    </h3>

                    <p>
                      {negativeSentimentCount}
                    </p>

                  </div>


                  <div className="card">

                    <h3>
                      AI Analyzed
                    </h3>

                    <p>
                      {tickets.length}
                    </p>

                  </div>

                </section>


                {/* ================= RECENT TICKETS ================= */}

                <section className="tickets-section">

                  <h2>
                    Recent Tickets
                  </h2>


                  {tickets.length === 0 ? (

                    <p>
                      No tickets found.
                    </p>

                  ) : (

                    tickets.map(ticket => (

                      <div
                        className="ticket"
                        key={ticket.id}
                        onClick={() => openTicket(ticket)}
                        style={{ cursor: "pointer" }}
                      >

                        <div>

                          <h3>
                            {ticket.title}
                          </h3>

                          <p>
                            {ticket.description}
                          </p>

                          <small>
                            Category: {ticket.category}
                          </small>

                        </div>


                        <span
                          className={`priority ${ticket.priority?.toLowerCase()}`}
                        >
                          {ticket.priority}
                        </span>

                      </div>

                    ))

                  )}

                </section>

              </>

            )}

          </>

        )}



        {/* ================================================= */}
        {/* CREATE TICKET */}
        {/* ================================================= */}

        {page === "create" && (

          <CreateTicket
            onTicketCreated={handleTicketCreated}
          />

        )}



        {/* ================================================= */}
        {/* TICKETS PAGE */}
        {/* ================================================= */}

        {page === "tickets" && (

          <>

            <header>

              <h1>
                Tickets
              </h1>

              <p>
                Manage and analyze customer support tickets
              </p>

            </header>


            {/* ================= SEARCH + FILTER ================= */}

            <section className="ticket-controls">

              <input
                type="text"
                placeholder="Search tickets..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />


              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value)
                }
              >

                <option value="ALL">
                  All Priorities
                </option>

                <option value="HIGH">
                  High
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="LOW">
                  Low
                </option>

                <option value="URGENT">
                  Urgent
                </option>

              </select>

            </section>



            {/* ================= TICKET LIST ================= */}

            <section className="tickets-section">

              <h2>
                All Tickets ({filteredTickets.length})
              </h2>


              {filteredTickets.length === 0 ? (

                <p>
                  No tickets match your search.
                </p>

              ) : (

                filteredTickets.map(ticket => (

                  <div
                    className="ticket"
                    key={ticket.id}
                    onClick={() => openTicket(ticket)}
                    style={{ cursor: "pointer" }}
                  >

                    <div>

                      <h3>
                        {ticket.title}
                      </h3>

                      <p>
                        {ticket.description}
                      </p>

                      <small>
                        Category: {ticket.category}
                      </small>

                      <br />

                      <small>
                        Sentiment: {ticket.sentiment}
                      </small>

                    </div>


                    {/* Ticket Actions */}

                    <div className="ticket-actions">

                      <span
                        className={`priority ${ticket.priority?.toLowerCase()}`}
                      >
                        {ticket.priority}
                      </span>


                      <button
                        className="delete-button"
                        onClick={(event) => {

                          event.stopPropagation();

                          deleteTicket(ticket.id);

                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))

              )}

            </section>

          </>

        )}



        {/* ================================================= */}
        {/* TICKET DETAILS */}
        {/* ================================================= */}

        {page === "details" && selectedTicket && (

          <>

            <header>

              <button
                className="back-button"
                onClick={() => setPage("tickets")}
              >
                ← Back to Tickets
              </button>


              <h1>
                Ticket Details
              </h1>


              <p>
                AI-powered analysis of customer support ticket
              </p>

            </header>



            <section className="ticket-details">


              {/* ================= TICKET INFORMATION ================= */}

              <div className="details-card">

                <h2>
                  {selectedTicket.title}
                </h2>


                <p className="ticket-description">
                  {selectedTicket.description}
                </p>


                <div className="ticket-meta">

                  <span>
                    Ticket ID: #{selectedTicket.id}
                  </span>

                </div>

              </div>



              {/* ================= AI ANALYSIS ================= */}

              <div className="details-card">

                <h2>
                  AI Analysis
                </h2>


                <div className="ai-grid">


                  {/* Category */}

                  <div>

                    <span>
                      Category
                    </span>

                    <strong>
                      {selectedTicket.category}
                    </strong>

                  </div>



                  {/* Priority */}

                  <div>

                    <span>
                      Priority
                    </span>

                    <strong
                      className={`priority ${selectedTicket.priority?.toLowerCase()}`}
                    >
                      {selectedTicket.priority}
                    </strong>

                  </div>



                  {/* Sentiment */}

                  <div>

                    <span>
                      Sentiment
                    </span>

                    <strong>
                      {selectedTicket.sentiment}
                    </strong>

                  </div>


                </div>

              </div>



              {/* ================= AI SUMMARY ================= */}

              <div className="details-card">

                <h2>
                  AI Summary
                </h2>


                <p>
                  {selectedTicket.summary}
                </p>

              </div>



              {/* ================= SUGGESTED RESPONSE ================= */}

              <div className="details-card">

                <h2>
                  Suggested Response
                </h2>


                <p>
                  {selectedTicket.suggestedResponse}
                </p>

              </div>



              {/* ================= DELETE ================= */}

              <div className="details-card details-actions">

                <button
                  className="delete-details-button"
                  onClick={() => deleteTicket(selectedTicket.id)}
                >
                  Delete Ticket
                </button>

              </div>


            </section>

          </>

        )}

      </main>

    </div>

  );
}

export default App;