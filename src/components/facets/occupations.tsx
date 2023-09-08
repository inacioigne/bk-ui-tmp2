import {
    Box,
    // IconButton,
    // List,
    // ListItem,
    // ListItemButton,
    // ListItemText,
    Typography,
} from "@mui/material";
import { TreeView } from '@mui/x-tree-view/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import { TreeItem, TreeItemProps, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { SvgIconProps } from '@mui/material/SvgIcon';

// BiblioKeia Services
import { SearchNames } from "@/services/searchNames";

// Types BiblioKeia
import Facet from "@/utils/types"

// Reacts Icons
import { RiFilterLine } from 'react-icons/ri';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';

import StyledTreeItem from "@/components/facets/styledTreeItem"

interface FacetProps {
    facets: Facet[];
    field: string;
    search: string;
    setRows: Function;
    setFacetType: Function;
    setOccupation: Function;
    setFacetAffiliation: Function;
}

const Occupations: React.FC<FacetProps> = ({
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
            fq: `occupation:${facet.name}`
        };
        SearchNames(params, setRows, setFacetType, setFacetAffiliation, setOccupation);
        console.log(params)

    }

    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<BsArrowsAngleExpand />}
            defaultExpandIcon={<BsArrowsAngleContract />}
            sx={{
                flexGrow: 1, overflowY: 'auto'
            }}
        >
            <StyledTreeItem nodeId="1" labelText="Ocupações" labelIcon={RiFilterLine}>

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
    );
};

export default Occupations;