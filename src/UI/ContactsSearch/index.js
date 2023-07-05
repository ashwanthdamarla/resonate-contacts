import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { ContactsContext } from "Context";

export default function ContactsSearch() {
  const { searchContacts } = useContext(ContactsContext);

  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Search"
      style={{ marginBottom: 10 }}
      onChange={(e) => {
        searchContacts(e.target.value);
      }}
      InputProps={{
        sx: { borderRadius: 10 },
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
