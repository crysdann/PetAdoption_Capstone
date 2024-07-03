// function takes a GraphQL query string and an optional variables object as parameters.
export default async function graphQLFetch(query, variables = {}) {
  // Using the fetch API to make an asynchronous POST request to the GraphQL endpoint.
  const request = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const response = await request.json();
  return response.data;
}
