(() => {
 "use strict";
 const KEY="bhutan-field-journal-entries-v1",form=document.getElementById("journalForm");
 if(!form)return;
 const fields=["journalHeadline","journalHighlight","journalDetails","journalPeople","journalFilm"],day=document.getElementById("journalDay"),status=document.getElementById("journalStatus");
 const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch{return{}}};
 let entries=load();
 const value=id=>document.getElementById(id).value;
 function showEntry(){const saved=entries[day.value]||{};fields.forEach(id=>document.getElementById(id).value=saved[id]||"");status.textContent=saved.updatedAt?"Saved on this device":"Not written yet";renderEntries()}
 function saveEntry(){const entry=Object.fromEntries(fields.map(id=>[id,value(id)]));if(Object.values(entry).every(v=>!String(v).trim()))delete entries[day.value];else entries[day.value]={...entry,updatedAt:new Date().toISOString()};try{localStorage.setItem(KEY,JSON.stringify(entries));status.textContent="Saved";renderEntries()}catch{status.textContent="Storage unavailable — export a copy"}}
 function renderEntries(){
  const holder=document.getElementById("journalEntries"),ids=Object.keys(entries).filter(k=>fields.some(id=>(entries[k][id]||"").trim())).sort((a,b)=>Number(a)-Number(b));
  document.getElementById("journalCount").textContent=ids.length+" / 10 entries";holder.replaceChildren();
  if(!ids.length){const p=document.createElement("p");p.className="journal-empty";p.textContent="Your first page will appear here after you save it.";holder.append(p);return}
  ids.forEach(k=>{const option=day.querySelector('option[value="'+k+'"]'),button=document.createElement("button");button.type="button";button.className="journal-entry-link";const span=document.createElement("span"),title=document.createElement("b"),arrow=document.createElement("i");span.textContent=option?option.textContent:"Day "+k;title.textContent=entries[k].journalHeadline||entries[k].journalHighlight||"Untitled day";arrow.textContent="↗";button.append(span,title,arrow);button.addEventListener("click",()=>{day.value=k;showEntry();form.scrollIntoView({behavior:"smooth",block:"start"})});holder.append(button)});
 }
 form.addEventListener("submit",e=>{e.preventDefault();saveEntry()});day.addEventListener("change",showEntry);
 document.getElementById("clearJournalEntry").addEventListener("click",()=>{if(!confirm("Clear the fields for this day? This removes the saved entry for this day from this browser."))return;delete entries[day.value];try{localStorage.setItem(KEY,JSON.stringify(entries))}catch{}fields.forEach(id=>document.getElementById(id).value="");status.textContent="Entry cleared";renderEntries()});
 document.getElementById("exportJournal").addEventListener("click",()=>{const blob=new Blob([JSON.stringify({title:"Bhutan Field Journal",exportedAt:new Date().toISOString(),entries},null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="bhutan-field-journal.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
 showEntry();
})();