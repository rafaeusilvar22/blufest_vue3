export const columns = [
  {
    name: "name",
    required: true,
    label: "Nome",
    align: "right",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "address",
    required: true,
    label: "Descrição",
    align: "rigth",
    field: (row) => row.address,
    sortable: true,
  },
];

export const columnsManage = [
  {
    name: "img_url",
    label: "Imagem",
    field: "img_url",
    sortable: false,
    align: "left",
  },
  {
    name: "title",
    required: true,
    label: "Nome do Evento",
    field: "title",
    format: (val) => `${val}`,
    sortable: true,
    align: "left",
  },
  // {
  //   name: "date",
  //   label: "Data do evento",
  //   field: "date",
  //   align: "left",
  // },
  { name: "acoes", label: "Ações", field: "Ações", align: "right" },
];
