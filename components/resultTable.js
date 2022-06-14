import DataTable from "react-data-table-component";

export default function ResultTable({ data }) {
  const columns = data[0].map((c, ix) => ({
    name: c,
    selector: (row) => row[ix],
    sortable: true,
  }));
  return (
    <DataTable
      columns={columns}
      data={data.slice(1)}
      dense
      theme="dark"
      paginationPerPage={25}
      pagination
      paginationRowsPerPageOptions={[10, 25, 50, 100]}
    />
  );
}
