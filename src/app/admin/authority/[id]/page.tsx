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

async function getData(id: string) {
  const url = `http://localhost:8983/solr/authority/select?fl=*%2C%5Bchild%5D&q=id%3A${id}`;

  const res = await fetch(url);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

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
  const [doc] = await data.response.docs;
  // console.log("params", doc)

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath={params.id} />
        <Typography variant="h4" gutterBottom>
          {doc.authority}
        </Typography>
        <Divider />
        <Box sx={{mt: "5px"}}>
        <Image
          src={doc.imagem[0]}
          width={200}
          height={300}
          alt="Picture of the author"
        />

        </Box>
       
      </Box>
    </Container>
  );
}
