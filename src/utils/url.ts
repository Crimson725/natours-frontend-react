export const getQueryParam = (queryParam: string, key: string) => {
    const urlParams = new URLSearchParams(queryParam);
    const paramVal = urlParams.get(key);
  
    return paramVal;
  };