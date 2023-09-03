import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

interface Facet {
  name: string;
  count: number;
}

interface FacetProps {
  facets: Facet[];
  field: string;
  search: string;
  setRows: Function;
  setFacetType: Function;
  setType: Function;
}

const Affiliation: React.FC<FacetProps> = ({
//   facets,
//   field,
//   search,
//   setRows,
//   setFacetType,
//   setType,
}) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Typography
        sx={{
          ml: "5px",
          borderBottom: 1,
          borderColor: "divider",
        }}
        variant="subtitle1"
        component="div"
      >
        Afiliação
      </Typography>
    </Box>
  );
};

export default Affiliation;