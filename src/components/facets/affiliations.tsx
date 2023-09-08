import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { TreeView } from '@mui/x-tree-view/TreeView';

// Reacts Icons
import { RiFilterLine } from 'react-icons/ri';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';

// BiblioKeia Services
import { SearchNames } from "@/services/searchNames";

// Types BiblioKeia
import Facet from "@/utils/types"

import StyledTreeItem from "@/components/facets/styledTreeItem"


interface FacetProps {
  facets: Facet[];
  field: string;
  search: string;
  setRows: Function;
  setFacetType: Function;
  setFacetAffiliation: Function;
}

const Affiliation: React.FC<FacetProps> = ({
  facets,
  field,
  search,
  setRows,
  setFacetType,
  setFacetAffiliation,
  setOccupation
}) => {

  const handleFacet = (facet: Facet) => {
    let params = {
      q: `${field}:${search}*`,
      fq: `affiliation:${facet.name}`
    };
    SearchNames(
      params, setRows, 
      setFacetType, setFacetAffiliation, setOccupation);

  }

  return (
    <TreeView
      defaultCollapseIcon={<BsArrowsAngleExpand />}
      defaultExpandIcon={<BsArrowsAngleContract />}
      sx={{
        flexGrow: 1, overflowY: 'auto'
      }}
    >
      <StyledTreeItem nodeId="1" labelText="Afiliação" labelIcon={RiFilterLine}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {
            facets?.map((facet, index) => (
              <StyledTreeItem
                key={index}
                nodeId={`${index + 2}`}
                labelText={facet.name}
                labelInfo={facet.count}
                color="#a250f5"
                bgColor="#f3e8fd"
                colorForDarkMode="#D9B8FB"
                bgColorForDarkMode="#100719"
                onClick={() => { handleFacet(facet) }}
              />
            ))
          }

        </Box>


      </StyledTreeItem>
    </TreeView>
  )

}

export default Affiliation;