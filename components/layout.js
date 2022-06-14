import Head from "next/head";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRouter } from "next/router";
import styles from "./layout.module.scss";

const BASE_URL = process.env.BASE_URL || "https://sql.farmsubsidy.org";
const DEFAULT_DESCRIPTION =
  "FarmSubsidy shows who gets subsidies under the European Common Agricultural Policy";
const TITLE = "Farmsubsidy SQL explorer & CSV download | farmsubsidy.org";

export default function Layout({ children }) {
  const router = useRouter();
  const url = `${BASE_URL}${router.asPath}`;
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/images/favicon/safari-pinned-tab.svg"
          color="#139744"
        />
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#139744" />
        <meta property="twitter:title" content={TITLE} />
        <meta
          name="msapplication-config"
          content="/images/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#139744" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@farmsubsidy" />
        <meta name="twitter:creator" content="@okfde" />
        <meta name="author" content="Open Knowledge Foundation Germany" />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} />
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <meta name="og:site" content="farmsubsidy.org" />
        <meta property="og:url" content={url} />
      </Head>
      <Container fluid as="main" className={styles.container}>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </>
  );
}
