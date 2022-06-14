async function baseApi(query, url="/api/query") {
  const res = await fetch(`${url}?query=${query}`);
  if (res.ok) {
    const data = await res.text();
    return data.trim();
  }
  if (res.status >= 400 && res.status < 600) {
    const { error } = await res.json();
    throw new Error(error);
  }
}

export async function clientApi(query) {
  return await baseApi(query)
}

export async function serverApi(query) {
  const url = `${process.env.API_URL}/sql`
  return await baseApi(query, url)
}
