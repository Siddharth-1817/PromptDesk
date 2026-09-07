const API_URL = "http://localhost:9096/api/tickets";

export async function getTickets() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return await response.json();
}