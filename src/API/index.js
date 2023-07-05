import { useEffect, useState } from "react";

function sortAlphabetically(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function useAPIContacts() {
  const [baseContacts, setBaseContacts] = useState(undefined);
  const [contacts, setContacts] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [searchText, setSearchText] = useState("");
  const [selectedContact, setSelectedContact] = useState(undefined);

  const clearSearch = () => {
    setContacts(
      baseContacts
        .sort((a, b) => sortAlphabetically(a, b))
        .group((e) => String(e.name).toUpperCase()?.[0])
    );

    setSearchText("");
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setBaseContacts(jsonData);
      setContacts(
        jsonData
          .sort((a, b) => sortAlphabetically(a, b))
          .group((e) => String(e.name).toUpperCase()?.[0])
      );
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const reloadContacts = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  const searchContacts = (pSearchText) => {
    pSearchText = pSearchText.toLowerCase();
    setSearchText(pSearchText);

    setContacts(
      baseContacts
        .filter((e) => {
          if (pSearchText.length > 1) {
            return (
              String(e.name).toLowerCase().includes(pSearchText) ||
              String(e.phone).toLowerCase().includes(pSearchText) ||
              String(e.email).toLowerCase().includes(pSearchText)
            );
          }
          if (pSearchText.length === 1) {
            return (
              String(e.name).toLowerCase().startsWith(pSearchText) ||
              String(e.phone).toLowerCase().startsWith(pSearchText) ||
              String(e.email).toLowerCase().startsWith(pSearchText)
            );
          }
          return e;
        })
        .sort((a, b) => sortAlphabetically(a, b))
        .group((e) => String(e.name).toUpperCase()?.[0])
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    contacts,
    error,
    loading,
    searchText,
    selectedContact,
    clearSearch,
    reloadContacts,
    searchContacts,
    setSelectedContact,
  };
}

export default useAPIContacts;