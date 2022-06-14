import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Papa from "papaparse";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Layout from "../components/layout.js";
import ResultTable from "../components/resultTable.js";
import DownloadButton from "../components/downloadButton.js";
import ErrorAlert from "../components/error.js";
import styles from "./index.module.scss";

const BASE_URL = process.env.BASE_URL || "";
const DEFAULT_QUERY = "SELECT * FROM farmsubsidy LIMIT 25";
const DEFAULT_URL = `/?query=${DEFAULT_QUERY}`;

async function api(query) {
  const res = await fetch(`${BASE_URL}/api/query?query=${query}`);
  if (res.ok) {
    const data = await res.text();
    return data.trim();
  }
  if (res.status >= 400 && res.status < 600) {
    const { error } = await res.json();
    throw new Error(error);
  }
}

export default function Index({ initialData }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.query || DEFAULT_QUERY);
  const [value, setValue] = useState(query);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);
  const [isLoading, setLoading] = useState(false);
  const numRows = (data?.length || 1) - 1; // header row

  // set query based on url param if any
  useEffect(() => {
    const urlQuery = router.query.query;
    if (!!urlQuery) {
      setQuery(urlQuery);
    }
  }, [router.query]);

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
        setLoading(false);
        setData([]);
        setError(message);
      });
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({ url: router.pathname, query: { query: value } });
  };

  return (
    <Layout>
      <h1>Farmsubsidy.org data SQL browser</h1>
      <p>Execute raw queries against the farmsubsidy database.</p>
      <p><a href="https://farmsubsidy.org/data">More information about the data</a></p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formSqlQuery">
          <Form.Label>Query</Form.Label>
          <Form.Control
            className={styles.textarea}
            as="textarea"
            rows={3}
            placeholder="Enter sql query..."
            defaultValue={DEFAULT_QUERY}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Group>
        <Button
          disabled={isLoading || query === value}
          variant="success"
          type="submit"
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
      <div className={styles.results}>
        <h3>{numRows ? `${numRows} Results` : "Results"}</h3>
        {isLoading && (
          <Spinner animation="grow" size="sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {error && <ErrorAlert message={error} defaultUrl={DEFAULT_URL} />}
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
