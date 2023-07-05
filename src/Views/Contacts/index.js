import { Divider } from "@mui/material";
import { ContactsContext } from "Context";
import ContactListItem from "UI/ContactListItem";
import ContactsSearch from "UI/ContactsSearch";
import { useContext } from "react";

export default function Contacts(props) {
  const { contacts } = useContext(ContactsContext);
  return (
    <div style={{ padding: 10 }}>
      <ContactsSearch />
      <div style={{ height: "80vh", overflowY: "scroll" }}>
        {contacts !== undefined &&
          Object.keys(contacts)?.map((e) => (
            <div key={e}>
              <Divider textAlign="left">{e}</Divider>
              {contacts[e]?.map((contact) => (
                <div key={contact.id}>
                  <ContactListItem {...contact} />
                  {/* <Divider /> */}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
