export default {
  async fetch(request) {
    const { method } = request;

    // Für eine OPTIONS-Anfrage: CORS Preflight
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*", // oder gezielt deine Domain
          "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Deine eigentliche Antwort, z. B. GET oder PUT
    let responseData = await handleRequest(request); // dein Logik-Code

    return new Response(responseData.body, {
      status: responseData.status || 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // CORS erlauben
      },
    });
  }
};

