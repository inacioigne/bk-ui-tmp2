import axios from "axios";

function search() {
    
    const api = axios.create({
      baseURL: "http://localhost:8983/solr/authority/",
    });  
  
   
    return api;
  }
  
export const solrAuthority = search()