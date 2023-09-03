"use client";
import {
  Container,
  Box,
  Divider,
  Typography,
  Grid,
  FormControl,
  InputLabel,
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
import { useState, useEffect, FormEvent } from "react";


// BiblioKeia Services
import { SearchNames } from "@/services/searchNames";

// BiblioKeia Components
import { TabName } from "src/components/tables/tabNames";
// import { FacetTypeNames } from "src/components/facets/typeNames";
import FacetTypeNames from "src/components/facets/typeNames";
import Affiliation from "src/components/facets/affiliations";

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

  const [type, setType] = useState("*");
  const [field, setField] = useState("general_search");
  const [search, setSearch] = useState("");
  const [docs, setDocs] = useState([]);
  const [rows, setRows] = useState([]);
  const [facetType, setFacetType] = useState([]);

  useEffect(() => {
    // searchAuthority("*", "general_search", "*");
    let params = {
      q: `${field}:${search}*`,
      "facet.field": "type",
      fl: "*,[child]",
      "q.op": "AND",
      fq: `type:${type}`,
      facet: "true",
    };
    SearchNames(params, setRows, setFacetType);
  }, []);

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
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let params = {
      q: `${field}:${search}*`,
      "facet.field": "type",
      fl: "*,[child]",
      "q.op": "AND",
      fq: `type:${type}`,
      facet: "true",
    };
    SearchNames(params, setRows, setFacetType);
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
                      <MenuItem value="personalname">Nome Pessoal</MenuItem>
                      <MenuItem value="corporatename">
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
                      <MenuItem value="label">Nome Autorizado</MenuItem>
                      <MenuItem value="fullerName">Nome completo</MenuItem>
                      <MenuItem value="variant">Variantes</MenuItem>
                      <MenuItem value="organization">Afiliação</MenuItem>
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
                  {facetType?.length > 0 && (
                    <FacetTypeNames
                      facets={facetType}
                      field={field}
                      search={search}
                      setRows={setRows}
                      setFacetType={setFacetType}
                      setType={setType}

                    />
                  )}
                  <Affiliation />
                </Grid>
                <Grid item xs={8}>
                  <TabName rows={rows} />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
