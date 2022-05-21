import Alert from "react-bootstrap/Alert";

export default function Error({ message }) {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error</Alert.Heading>
      {message} <Alert.Link href="#">Try a working example.</Alert.Link>
    </Alert>
  );
}
