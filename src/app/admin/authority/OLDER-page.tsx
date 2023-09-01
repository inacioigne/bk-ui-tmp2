"use client";
// MUI Components
import {
  Container,
  Box,
  Divider,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
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
} from "@mui/material";
// MUI Icons
// import { PersonAdd, Home, Search } from "@mui/icons-material/";

// React Icons
import { CiImport } from "react-icons/ci";
import { VscNewFile } from "react-icons/vsc";
import { FcHome, FcSearch } from 'react-icons/fc';

// Nextjs Components
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
// import CardAuthorityBk from "src/components/cards/cardAuthorityBk";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Services
// import { solrAuthority } from "src/services/solrAuthority";


const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
];

export default function Authority() {

  const searchParams = useSearchParams();
  const bkId = searchParams.get("id");

  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [docs, setDocs] = useState([]);
  const [doc, setDoc] = useState(null);

//   const searchAuthority = (search: string) => {
//     let params = {
//       q: `label:${search}*`,
//       fl: "*,[child]",
//       "q.op": "AND",
//       fq: "type:*",
//     };
//     solrAuthority
//       .get("select", {
//         params: params,
//       })
//       .then((response: any) => {
//         setDocs(response.data.response.docs);
//         // console.log(response.data.response.docs);
//       })
//       .catch(function (error) {
//         console.log("ERROOO!!", error);
//       });
//     // .finally(function () {
//     //   setLoading(false);
//     // });
//   };

//   const getDoc = (id: string) => {
//     let params = {
//       q: `id:${id}`,
//       fl: "*,[child]",
//     };
//     solrAuthority
//       .get("select", {
//         params: params,
//       })
//       .then((response) => {
//         // setDocs(response.data.response.docs);
//         // console.log(response.data.response.docs);
//         return response.data.response.docs;
//       })
//       .then(([doc]) => {
//         setDoc(doc);
//         // console.log(doc);
//       })
//       .catch(function (error) {
//         console.log("ERROOO!!", error);
//       });
//   };

//   useEffect(() => {
//     if (bkId) {
//       getDoc(bkId);
//       console.log(bkId);

//     } 
    
//   }, [bkId]);

  const handleChangeType = (event) => {
    setType(event.target.value as string);
    // getData(search, event.target.value, currentPage);
  };

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK
          previousPaths={previousPaths}
          currentPath="Autoridades"
        />
      </Box>
      <Typography variant="h4" gutterBottom>
        Autoridades
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={5} sx={{ mt: "15px" }}>
          <Paper elevation={3} sx={{ p: "15px" }}>
            <form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Selecione uma opção
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Selecione uma opção"
                    onChange={handleChangeType}
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
                    <MenuItem value="CorporateName">Nome Corporativo</MenuItem>
                    <MenuItem value="Title">Título</MenuItem>
                    <MenuItem value="CorporateName">Nome Geográfico</MenuItem>
                    <MenuItem value="Conference">Evento</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Busca"
                  variant="outlined"
                  value={search}
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // setSearch(e.target.value);
                    // searchAuthority(e.target.value);
                  }}
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
              </Box>
            </form>
          </Paper>
          <Box sx={{ mt: "10px" }}>
            {search && (
              <Paper elevation={3} sx={{ mb: "10px" }}>
                {docs.length > 0 ? (
                  <nav aria-label="main mailbox folders">
                    <List>
                      {docs?.map((doc, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemButton
                            onClick={() => {
                              getDoc(doc.id);
                              // console.log(doc.id);
                            }}
                          >
                            <ListItemIcon>
                              <PersonAdd />
                            </ListItemIcon>
                            <ListItemText primary={doc.label} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </nav>
                ) : (
                  <Box sx={{ p: "10px" }}>
                    <Typography>Nenhum registro encontrado</Typography>
                    <Divider />
                    <Box sx={{ display: "flex", gap: "10px", p: "5px" }}>
                      <Link href="/admin/authority/importation/lcnaf">
                        <Button
                          variant="outlined"
                          startIcon={<CiImport />}
                          sx={{ textTransform: "none" }}
                        >
                          Importar
                        </Button>
                      </Link>

                      <Button
                        variant="outlined"
                        startIcon={<VscNewFile />}
                        sx={{ textTransform: "none" }}
                      >
                        Novo
                      </Button>
                    </Box>
                  </Box>
                )}
              </Paper>
            )}
          </Box>
        </Grid>
        <Grid item xs={7} sx={{ mt: "15px" }}>
          {doc && <CardAuthorityBk doc={doc} setDoc={setDoc} setSearch={setSearch} />}
        </Grid>
      </Grid>
    </Container>
  );
}
