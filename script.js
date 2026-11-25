(() => {
  const stages=["blank-stage","assets-stage","store-stage"];
  const assets=["app-shell.css","app-shell.js","storefront-icons.svg","shopify-mark.svg","fonts/inter.woff2","app-store-layout.css","app-store-runtime.js"];
  const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const show=id=>stages.forEach(stage=>document.getElementById(stage).classList.toggle("hidden",stage!==id));
  let runToken=0;
  async function startSequence(){
    const token=++runToken;
    show("blank-stage");
    await delay(700);
    if(token!==runToken)return;
    show("assets-stage");
    const list=document.getElementById("asset-list"),count=document.getElementById("asset-count"),progress=document.getElementById("asset-progress");
    list.innerHTML="";count.textContent="0 / "+assets.length;progress.style.width="0%";
    for(let i=0;i<assets.length;i++){
      if(token!==runToken)return;
      const row=document.createElement("div");row.className="asset-row";
      row.innerHTML='<span class="asset-dot"></span><span></span><span class="asset-status">Loading</span>';
      row.children[1].textContent=assets[i];list.appendChild(row);
      await delay(110);
      if(token!==runToken)return;
      row.classList.add("done");row.children[2].textContent="Loaded";
      count.textContent=(i+1)+" / "+assets.length;progress.style.width=((i+1)/assets.length*100)+"%";
    }
    await delay(250);if(token!==runToken)return;show("store-stage");
  }
  const search=document.getElementById("app-search");
  const cards=[...document.querySelectorAll(".app-card")];
  const noResults=document.getElementById("no-results");
  function filterApps(){
    const term=search.value.trim().toLowerCase();let visible=0;
    cards.forEach(card=>{
      const haystack=(card.dataset.search||"")+" "+card.innerText.toLowerCase();
      const match=!term||haystack.includes(term);
      card.classList.toggle("hidden",!match);if(match)visible++;
    });
    noResults.classList.toggle("hidden",visible!==0);
  }
  document.getElementById("search-form").addEventListener("submit",event=>{event.preventDefault();filterApps();});
  search.addEventListener("input",filterApps);
  document.getElementById("retry-button").addEventListener("click",startSequence);
  startSequence();
})();