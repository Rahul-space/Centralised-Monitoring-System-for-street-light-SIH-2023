export const userColumns = [
  { field: "_id", headerName: "_id", width: 70 },
  {
    field: "username",
    headerName: "Username",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "phone",
    headerName: "phone",
    width: 230,
  },

  {
    field: "role",
    headerName: "Role",
    width: 100,
  },
  {
    field: "zone",
    headerName: "Zone",
    width: 160,
  },
];

export const userRows = [
];
