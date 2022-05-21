import { useState, useEffect } from "react";
import Papa from "papaparse";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Layout from "../components/layout.js";
import ResultTable from "../components/resultTable.js";
import DownloadButton from "../components/downloadButton.js";
import ErrorAlert from "../components/error.js";

const DEFAULT_QUERY = "SELECT * FROM farmsubsidy LIMIT 10";

async function api(query) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sql?query=${query}`
  );
  if (res.ok) {
    const data = await res.text()
    return data.trim()
  }
  if (res.status >= 400 && res.status < 600) {
    const { error } = await res.json();
    throw new Error(error);
  }
}

export default function Index({ initialData }) {
  const [value, setValue] = useState(DEFAULT_QUERY);
  const [error, setError] = useState();
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [data, setData] = useState(initialData);
  const [isLoading, setLoading] = useState(false);
  const numRows = (data?.length || 1) - 1; // header row
  useEffect(() => {
    setError();
    setLoading(true);
    setData([]);
    api(query)
      .then((res) => {
        setData(Papa.parse(res).data);
        setLoading(false);
      })
      .catch(({ message }) => {
        console.log(message);
        setLoading(false);
        setData([]);
        setError(message);
      });
  }, [query]);
  return (
    <Layout>
      <h1>Farmsubsidy data SQL browser</h1>
      <p>Execute raw queries against the farmsubsidy database.</p>
      <Form>
        <Form.Group className="mb-3" controlId="formSqlQuery">
          <Form.Label>Query</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter sql query..."
            defaultValue={DEFAULT_QUERY}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Group>
        <Button
          disabled={isLoading || value === query}
          variant="primary"
          onClick={() => setQuery(value)}
        >
          {isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          Run
        </Button>
        {numRows > 0 && <DownloadButton data={data} />}
      </Form>
      <div className="fsql-results">
        <h3>{numRows ? `${numRows} Results` : "Results"}</h3>
        {isLoading && (
          <Spinner animation="grow" size="sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          )}
          {error && <ErrorAlert message={error} />}
          {data.length > 0 && <ResultTable data={data} />}
        </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await api(DEFAULT_QUERY);
  const initialData = Papa.parse(data).data;
  return {
    props: { initialData },
  };
}
