import queryString from "query-string";

export const updateQueryString = (query: string, value: string) => {
  const currentQuery = window.location.search;

  const queryObject = queryString.parse(currentQuery);

  queryObject[query] = value;
  const updatedQuery = queryString.stringify(queryObject);
  window.history.replaceState(null, "", `?${updatedQuery}`);
};
