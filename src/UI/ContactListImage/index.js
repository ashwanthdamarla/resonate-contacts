import { DefaultImageURI } from "Assets/DefaultImage";

export default function ContactListImage(props) {
  const width = props?.size === "large" ? 100 : 40;
  const height = props?.size === "large" ? 100 : 40;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        verticalAlign: "center",
        height: "100%",
      }}
    >
      <img
        style={{ width, height, borderRadius: 60 / 2 }}
        src={DefaultImageURI}
        alt="no img"
      />
    </div>
  );
}
