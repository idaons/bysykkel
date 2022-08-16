export const fetcher = (url: string) =>
  fetch(url, { headers: { "Client-Identifier": "idaons-bysykkel" } }).then(
    (response) => response.json()
  );
