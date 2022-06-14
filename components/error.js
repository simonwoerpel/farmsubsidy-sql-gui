import Alert from "react-bootstrap/Alert";

export default function Error({ message, defaultUrl }) {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error</Alert.Heading>
      {message}{" "}
      <Alert.Link href={defaultUrl}>Try a working example.</Alert.Link>
    </Alert>
  );
}
