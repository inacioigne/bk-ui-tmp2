import axios from "axios";

function search() {
    
    const api = axios.create({
      baseURL: "http://localhost:8080/solr/",
    });  
  
   
    return api;
  }
  
export const solr = search()