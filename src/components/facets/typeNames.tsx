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

// BiblioKeia Services
import { SearchNames } from "@/services/searchNames";

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
const FacetTypeNames: React.FC<FacetProps> = ({ facets, field, search, setRows, setFacetType, setType }) => {

//   q={!parent which="type:* hasAffiliation:*"}organization:*

// q={!parent which="type:* hasAffiliation:*"}organization:Academia

//  "params":{
//       "q":"q={!parent which=\"type:* occupation:*\"}label:Novelists",
//       "indent":"true",
//       "fl":"*,[child]",
//       "q.op":"OR",
//       "useParams":""}},

  const obj = {
    personalname: "Nome Pessoal",
    corporatename: "Nome Coorporativo",
  };

   function handleFacet(facet:Facet, field:string, search:string, setType:Function ) {
    let params = {
      q: `${field}:${search}*`,
      "facet.field": "type",
      fl: "*,[child]",
      "q.op": "AND",
      fq: `type:${facet.name}`,
      "facet":"true",
    };
    setType(facet.name)

    SearchNames(params, setRows, setFacetType)
    // console.log("F:", params)
    
  }

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
        Tipo
      </Typography>
      <List>
        {facets?.map((facet, index) => (
          <ListItem
            key={index}
            onClick={() =>{handleFacet(facet, field, search, setType)}}
            disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="count" size="small">
                {facet.count}
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemText primary={`${obj[facet.name]}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default FacetTypeNames;
