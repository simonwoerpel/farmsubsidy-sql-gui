import Papa from "papaparse";
import Button from "react-bootstrap/Button";

const toB64 = (value) =>
  typeof btoa !== "undefined"
    ? btoa(value)
    : Buffer.from(value).toString("base64"); // node build

export default function DownloadButton({ data }) {
  const strData = toB64(unescape(encodeURIComponent(Papa.unparse(data))));
  const dataUrl = `data:text/csv;base64,${strData}`;
  return (
    <Button variant="secondary" href={dataUrl} download="farmsubsidies.csv">
      Download as CSV
    </Button>
  );
}
