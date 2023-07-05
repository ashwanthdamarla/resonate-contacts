import useAPIContacts from "API";
import { ContactsContext } from "Context";
import ContactDetails from "Views/ContactDetails";
import Contacts from "Views/Contacts";

import { Divider, Grid } from "@mui/material";
import NavBar from "UI/NavBar";

export default function Home(props) {
  const {
    contacts,
    error,
    loading,
    searchText,
    selectedContact,
    clearSearch,
    reloadContacts,
    searchContacts,
    setSelectedContact,
  } = useAPIContacts();

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        error,
        loading,
        searchText,
        selectedContact,
        clearSearch,
        reloadContacts,
        searchContacts,
        setSelectedContact,
      }}
    >
      <NavBar />
      <Grid container spacing={1}>
        {/* <Grid item xs={12}></Grid> */}
        <Grid item xs={3}>
          <Contacts />
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ marginLeft: 2, marginTop: 2, height: "90vh" }}
        />
        <Grid item xs={8.5}>
          {selectedContact !== undefined ? <ContactDetails /> : <></>}
        </Grid>
      </Grid>
    </ContactsContext.Provider>
  );
}
