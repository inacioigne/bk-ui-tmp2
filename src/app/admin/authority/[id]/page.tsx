import {
  Container,
  Box,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Button,
  Typography,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// React Icons
import { FcHome, FcSearch } from "react-icons/fc";

import Image from "next/image";

// BiblioKeia Services
import { solr } from "@/services/solr";

async function getData(id: string) {
  // const url = `http://localhost:8983/solr/authority/select?fl=*%2C%5Bchild%5D&q=id%3A${id}`;
  // const url = 'http://localhost:8983/solr/authority/select?fl=*%2C%5Bchild%5D&q=id%3Abka-1'
  const url = 'http://localhost:8000/import/loc/agents?uri=http%3A%2F%2Fid.loc.gov%2Fauthorities%2Fnames%2Fn80002329'


  const res = await fetch(url);
  console.log(res.json())


  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
  {
    link: "/admin/Authority",
    label: "Autoridades",
    icon: <FcHome fontSize="small" />,
  },
];

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  // const [doc] = await data.response.docs;
  console.log("params", params.id)

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath={params.id} />
        <Typography variant="h4" gutterBottom>
          authority
        </Typography>
        <Divider />
        <Box sx={{mt: "5px"}}>
        
        </Box>
       
      </Box>
    </Container>
  );
}
