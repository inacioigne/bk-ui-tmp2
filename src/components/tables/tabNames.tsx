"use client";
// BiblioKeia Services
import { solrAuthority } from "src/services/solrAuthority";
// React Hooks
import { useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

import { TbUserSearch } from "react-icons/tb";



export function TabName() {
  const [docs, setDocs] = useState(null);
  function searchAuthority(type: string, field: string, search: string) {
    let params = {
      q: `${field}:${search}*`,
      fl: "*,[child]",
      "q.op": "AND",
      fq: `type:${type}`,
    };
    solrAuthority
      .get("select", {
        params: params,
      })
      .then((response: any) => {
        
        const docs = response.data.response.docs 
        const x = docs.map((doc, index) => { return {
          id: doc.id, col1: index, col2: doc.type }})
        setDocs(x)
        console.log(x)
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  }
  // searchAuthority("*", "general_search", "*");


  const columns: GridColDef[] = [
    { field: "col1", flex: 1, renderHeader: () => <strong>{"Nome"}</strong> },
    { field: "col2", flex: 1, renderHeader: () => <strong>{"Tipo"}</strong> },
  ];
  
  // const rows: GridRowsProp = [
  //   { id: 1, col1: "Hello", col2: "World" },
  //   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  //   { id: 3, col1: "MUI", col2: "is Amazing" },
  // ];
  let rows: GridRowsProp = []

   useEffect(() => {
    searchAuthority("*", "general_search", "*");
    
  }, []);

  if (docs) {
    let rows: GridRowsProp = docs
    return <DataGrid rows={rows} columns={columns} autoHeight={true} />;

  } else {
    return null
  }




  
}
