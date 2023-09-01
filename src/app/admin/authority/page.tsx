"use client";
import {
  Container,
  Box,
  Divider,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  //   Select,
  MenuItem,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// React Icons
import { CiImport } from "react-icons/ci";
import { VscNewFile } from "react-icons/vsc";
import { FcHome, FcSearch } from "react-icons/fc";
import { BsPersonCheck } from "react-icons/bs";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbUserSearch } from "react-icons/tb";
import { GiSpookyHouse } from "react-icons/gi";
import { MdSubject } from "react-icons/md";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Services
import { solrAuthority } from "src/services/solrAuthority";

// BiblioKeia Components
import { TabName } from "src/components/tables/tabNames"


const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
          {/* <Typography>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const columns: GridColDef[] = [
  { field: "col1", flex: 1, renderHeader: () => <strong>{"Nome"}</strong> },
  { field: "col2", flex: 1, renderHeader: () => <strong>{"Tipo"}</strong> },
];
export default function Authority() {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("*");
  const [field, setField] = useState("general_search");
  const [docs, setDocs] = useState([]);
  const [row, setRows] = useState([])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
    // getData(search, event.target.value, currentPage);
  };
  const handleChangeField = (event: SelectChangeEvent) => {
    setField(event.target.value as string);
    // getData(search, event.target.value, currentPage);
  };
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value as string);
    // getData(search, event.target.value, currentPage);
  };

  // const async searchAuthority = () => {
  //   let params = {
  //     q: `${field}:${search}*`,
  //     fl: "*,[child]",
  //     "q.op": "AND",
  //     fq: `type:${type}`,
  //   };
  //   solrAuthority
  //     .get("select", {
  //       params: params,
  //     })
  //     .then((response: any) => {
  //       // setDocs(response.data.response.docs);
  //       const x = response.data.response.docs.map((doc, index) => {id: doc.id})
  //       return x
  //       // console.log(x);
  //       // setRows([ { id: 1, col1: "Hello", col2: "World" },
  //       // { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  //       // { id: 3, col1: "MUI", col2: "is Amazing" }])
  //     })
  //     .catch(function (error) {
  //       console.log("ERROOO!!", error);
  //     });
  // };

  // useEffect(() => {
  //   searchAuthority();
  // }, []);

  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];


  const onSubmit = (e) => {
    e.preventDefault();

    let params = {
      q: `${field}:${search}*`,
      fl: "*,[child]",
      "q.op": "AND",
      fq: `type:${type}`,
    };
    console.log(params);

    solrAuthority
      .get("select", {
        params: params,
      })
      .then((response: any) => {
        setDocs(response.data.response.docs);
        // console.log(response.data.response.docs);
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
    // console.log(params);
  };

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK
          previousPaths={previousPaths}
          currentPath="Autoridades"
        />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <Box sx={{ textTransform: "none" }}>
                  {" "}
                  <TbUserSearch /> Autores
                </Box>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Box sx={{ textTransform: "none" }}>
                  {" "}
                  <MdSubject /> Assuntos
                </Box>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Paper elevation={3} sx={{ p: "15px" }}>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <FormControl fullWidth>
                    <InputLabel id="type-label">Tipo</InputLabel>
                    <Select
                      labelId="type-label"
                      id="type-select"
                      value={type}
                      label="Tipo"
                      onChange={handleChangeType}
                    >
                      <MenuItem value="*">Todos</MenuItem>
                      <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
                      <MenuItem value="CorporateName">
                        Nome Cooporativo
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl fullWidth>
                    <InputLabel id="field-label">Filtro</InputLabel>
                    <Select
                      labelId="field-label"
                      id="field-select"
                      value={field}
                      label="Filtro"
                      onChange={handleChangeField}
                    >
                      <MenuItem value="general_search">Todos</MenuItem>
                      <MenuItem value="authority">Nome Autorizado</MenuItem>
                      <MenuItem value="fullerName">Nome completo</MenuItem>
                      <MenuItem value="variant">Variantes</MenuItem>
                      <MenuItem value="affliation">Afiliação</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label="Busca"
                    variant="outlined"
                    value={search}
                    fullWidth
                    onChange={handleChangeSearch}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            color="primary"
                            aria-label="Search"
                            type="submit"
                          >
                            <FcSearch />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </form>
            <Box sx={{ mt: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  FILTROS
                </Grid>
                <Grid item xs={8}>
                  {/* <DataGrid rows={row} columns={columns} autoHeight={true} /> */}
                  <TabName />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
