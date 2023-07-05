import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ContactsContext } from "Context";
import ContactListImage from "UI/ContactListImage";
import { useContext, useEffect, useState } from "react";
import { Star, StarBorder } from "@mui/icons-material";

import "index.css";

export default function ContactDetails(props) {
  const { selectedContact, favourites, toggleFavourite } =
    useContext(ContactsContext);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (favourites?.length >= 0) {
      setIsFavourite(favourites.some((e) => e.id === selectedContact.id));
    }
  }, [favourites, selectedContact]);

  return (
    <div style={{ padding: 20, marginLeft: 10 }}>
      <Grid container>
        <Grid item xs={8}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <ContactListImage size="large" />
            <div
              style={{
                alignItems: "center",
                verticalAlign: "center",
                marginLeft: 20,
              }}
            >
              <Typography variant="h5">
                {selectedContact.name} ({selectedContact.username})
              </Typography>
              <Typography variant="subtitle2">
                {selectedContact.company.name}
              </Typography>
              <Typography variant="subtitle2">
                {selectedContact.company.catchPhrase}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={() => toggleFavourite()}>
              {isFavourite ? (
                <Star style={{ color: "#FFD700" }} />
              ) : (
                <StarBorder />
              )}
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <br />
      <Card>
        <CardHeader
          title="Contact Details"
          titleTypographyProps={{ variant: "h6" }}
        />
        <CardContent>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <EmailIcon />
            <Typography variant="subtitle2">
              <Link
                href={"mailto:" + selectedContact.email}
                style={{ marginLeft: 10 }}
              >
                {selectedContact.email}
              </Link>
            </Typography>
          </div>
          <br />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <LocalPhoneIcon />
            <Typography variant="subtitle2">
              <Link
                href={"tel:" + selectedContact.phone}
                style={{ marginLeft: 10 }}
              >
                {selectedContact.phone}
              </Link>
            </Typography>
          </div>
          <br />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <PublicIcon />
            <Typography variant="subtitle2">
              <Link
                href={"http://" + selectedContact.website}
                rel="noopener noreferrer"
                style={{ marginLeft: 10 }}
                target="_blank"
              >
                {selectedContact.website}
              </Link>
            </Typography>
          </div>
          <br />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <LocationOnIcon />
            <Typography variant="subtitle2">
              <Link
                target="_blank"
                href={`https://maps.google.com/?q=${selectedContact?.address?.geo?.lat},${selectedContact?.address?.geo?.lng}`}
                style={{ marginLeft: 10 }}
              >
                {selectedContact?.address !== undefined
                  ? `${selectedContact?.address?.suite + "," ?? ""} ${
                      selectedContact?.address?.street + "," ?? ""
                    } ${selectedContact?.address?.city + "," ?? ""} ${
                      selectedContact?.address?.zipcode ?? ""
                    }`
                  : ""}
              </Link>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
