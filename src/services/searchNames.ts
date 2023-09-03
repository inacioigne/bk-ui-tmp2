// React Hooks
import { useState, useEffect } from "react";
// BiblioKeia Services
import { solr } from "@/services/solr";


interface Params {
  q: string;
  "facet.field": string;
  fl: string;
  "q.op": string;
  fq: string;
  facet: string; 
} 

export function SearchNames(params: Params, setRows: Function, setFacetType: Function ) {

    solr
      .get("authority/select", {
        params: params,
      })
      .then((response: any) => {
        const docs = response.data.response.docs;
        const r = docs.map((doc: any, index:number ) => {
          return { id: doc.id, label: doc.label[0], type: doc.type[0] };
        });
        setRows(r);
        // FACETES
        const fType = response.data.facet_counts.facet_fields.type
        const afTpye = []
        for (let i = 0; i < fType.length; i += 2) {
          const chave = fType[i];
          const valor = fType[i + 1];
          if (valor > 0) {
            afTpye.push({'name': chave, 'count': valor})
          }
        }
        console.log(response)
        setFacetType(afTpye)
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  }