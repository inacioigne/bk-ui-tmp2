// React Hooks
import { useState, useEffect } from "react";
// BiblioKeia Services
import { solr } from "@/services/solr";

// import axios from "axios";

interface Params {
  q: string;
  // "facet.field": string;
  // fl: string;
  // "q.op": string;
  fq: string;
  // facet: string;
}

function TransformFacet(facets) {
  const listFacets = [];
  for (let i = 0; i < facets.length; i += 2) {
    const chave = facets[i];
    const valor = facets[i + 1];
    if (valor > 0) {
      listFacets.push({ name: chave, count: valor });
    }
  }
  return listFacets;
}

export function SearchNames(
  params: Params,
  setRows: Function,
  setFacetType: Function,
  setFacetAffiliation: Function,
  setOccupation: Function
) {

  const json = {
      query: "*:*",
      filter:"type:personalname",
      filter:"affiliation:Academia Brasileira de Letras",
    }
  const jsonString = JSON.stringify(json);
  const query = { json: jsonString}
  

  const param = new URLSearchParams();
  param.append('q', '*:*');
  param.append('fq', 'type:personalname');
  param.append('fq', 'affiliation:Academia Brasileira de Letras');
  param.append('facet.field', 'type');
  param.append('facet.field', 'affiliation_str');
  param.append('facet', 'true');
  
  console.log(param)
  // 

  // solr
  //   .get(
  //     `authority/select?
  //   facet.field=type&facet.field=affiliation_str&facet.field=occupation_str&facet=true
  //   &fl=*%2C%5Bchild%5D
  //   &fq=affiliation%3AAcademia%20Brasileira%20de%20Letras&fq=occupation%3ANovelists
  //   &indent=true
  //   &q.op=AND
  //   &q=${params.q}`
  //   )
  solr.get("authority/query?", {params: param})
    .then(function (response) {
      console.log(response)
      // const docs = response.data.response.docs;

      // const r = docs.map((doc: any, index: number) => {
      //   return { id: doc.id, authority: doc.authority[0], type: doc.type[0] };
      // });
      // setRows(r);

      // // Facets
      // const fType = TransformFacet(
      //   response.data.facet_counts.facet_fields.type
      // );
      // setFacetType(fType);
      // const fAffiliation = TransformFacet(
      //   response.data.facet_counts.facet_fields.affiliation_str
      // );
      // setFacetAffiliation(fAffiliation);
      
      // const fOccupation = TransformFacet(
      //   response.data.facet_counts.facet_fields.occupation_str
      // );
      // setOccupation(fOccupation)
    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error(error);
    })
    .finally(function () {
      // sempre será executado
    });
}
