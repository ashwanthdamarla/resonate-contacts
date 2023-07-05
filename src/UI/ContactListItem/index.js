import { Grid, Typography } from "@mui/material";
import { ContactsContext } from "Context";
import ContactListImage from "UI/ContactListImage";
import { useContext } from "react";

export default function ContactListItem(props) {
  const { searchText, setSelectedContact, selectedContact } =
    useContext(ContactsContext);

  const getHighlightedText = (text) => {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text
      .split(new RegExp(`(${searchText})`, "gi"))
      .filter((e) => e);
    return (
      <span>
        {parts.map((part, i) => {
          if (searchText.length === 1) {
            return part.toLowerCase() === searchText.toLowerCase() &&
              i === 0 ? (
              <mark>{part}</mark>
            ) : (
              part
            );
          }
          return part.toLowerCase() === searchText.toLowerCase() ? (
            <mark>{part}</mark>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <Grid
      container
      spacing={1}
      style={{ marginLeft: 2, width: "99%", marginTop: 3, marginBottom: 3 }}
      sx={{
        cursor: "pointer",
        paddingLeft: 2,
        backgroundColor: selectedContact?.id === props.id ? "#d3d3d3" : "white",
        borderRadius: 2,
        "&:hover": { backgroundColor: "#d3d3d3" },
      }}
      onClick={() => setSelectedContact(props)}
    >
      <Grid item xs={3}>
        <ContactListImage />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="subtitle1">
          {searchText?.length > 0 ? getHighlightedText(props.name) : props.name}
        </Typography>
        <Typography variant="caption">
          {searchText?.length > 0
            ? getHighlightedText(props.phone)
            : props.phone}
        </Typography>
        <br />
        <Typography variant="caption">
          {searchText?.length > 0
            ? getHighlightedText(props.email)
            : props.email}
        </Typography>
      </Grid>
    </Grid>
  );
}
