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
  const googleTools=[
    ["Google Search Console","Monitor indexing, search queries, clicks, and organic search performance.","google","Google service","https://search.google.com/search-console/about","search console seo indexing webmaster"],
    ["Google Merchant Center","Manage product data and make eligible products discoverable across Google.","google","Google service","https://merchants.google.com/","merchant center product feed shopping listings"],
    ["Google Analytics 4","Understand store traffic, customer journeys, and ecommerce events.","googleanalytics","Google service","https://analytics.google.com/","ga4 analytics traffic conversions ecommerce"],
    ["Google Ads","Create and measure campaigns that bring shoppers to your store.","googleads","Google service","https://ads.google.com/","advertising ppc campaigns paid search"],
    ["Google Tag Manager","Manage website marketing and analytics tags from one place.","googletagmanager","Google service","https://tagmanager.google.com/","gtm tags tracking pixels"],
    ["Google Business Profile","Manage how an eligible local business appears on Google Search and Maps.","googlemaps","Google service","https://www.google.com/business/","local business maps profile"],
    ["PageSpeed Insights","Check page performance and Core Web Vitals for mobile and desktop.","pagespeedinsights","Google tool","https://pagespeed.web.dev/","pagespeed performance core web vitals speed"],
    ["Google Trends","Explore search interest and compare product or topic demand over time.","googletrends","Google tool","https://trends.google.com/","trends demand research topics"],
    ["Google Keyword Planner","Research keyword ideas and estimated search advertising demand.","googleads","Google Ads tool","https://ads.google.com/home/tools/keyword-planner/","keyword planner keyword research seo"],
    ["Google Search","Research how shoppers search and inspect public search results.","google","Google tool","https://www.google.com/","search engine queries"],
    ["Google Manufacturer Center","Provide detailed product information for eligible manufacturers.","google","Google service · eligibility required","https://manufacturercenter.google.com/","manufacturer center product data"],
    ["YouTube Channel integration","Connect YouTube product content and shopping experiences where eligible.","youtube","Google / YouTube integration","https://www.youtube.com/","youtube channel video shopping integration"]
  ];
  const shopifyTools=[
    ["Smart SEO","Optimize metadata, structured data, image alt text, and technical SEO.","shopify","Shopify app","https://apps.shopify.com/smart-seo","smartseo seo metadata schema"],
    ["TinySEO (formerly TinyIMG)","Improve SEO and page speed with image optimization and structured data.","shopify","Shopify app","https://apps.shopify.com/smart-image-optimizer","tinyimg tinyseo image compression speed seo"],
    ["Judge.me Product Reviews","Collect product reviews, star ratings, and customer photo testimonials.","judgeme","Shopify app","https://apps.shopify.com/judgeme","judge me reviews ratings testimonials"],
    ["Klaviyo Email Marketing","Build email and SMS marketing flows and customer segments.","klaviyo","Shopify app","https://apps.shopify.com/klaviyo-email-marketing","klaviyo email sms automation"],
    ["Shopify Inbox","Chat with shoppers and manage customer conversations from your store.","shopify","Shopify app · made by Shopify","https://apps.shopify.com/inbox","inbox live chat customer support"],
    ["Shopify Flow","Automate store workflows, repetitive tasks, and business processes.","shopify","Shopify app · made by Shopify","https://apps.shopify.com/flow","flow automation workflows"],
    ["Google & YouTube sales channel","Sync products and reach shoppers across Google and YouTube surfaces.","google","Shopify sales channel","https://apps.shopify.com/google","google youtube sales channel product sync"],
    ["TikTok sales channel","Connect your store with TikTok for product syncing and advertising.","tiktok","Shopify sales channel","https://apps.shopify.com/tiktok","tiktok ads social commerce sales channel"],
    ["Facebook & Instagram","Connect your catalogue with Meta platforms and run social commerce campaigns.","meta","Shopify sales channel","https://apps.shopify.com/facebook","facebook instagram meta catalog social commerce"],
    ["Shopify Search & Discovery","Customize storefront search, filters, product recommendations, and discovery.","shopify","Shopify app · made by Shopify","https://apps.shopify.com/search-and-discovery","search discovery filters recommendations"]
  ];
  function addResourceCards(targetId,items){
    const target=document.getElementById(targetId);
    items.forEach(([name,description,icon,kind,url,keywords])=>{
      const card=document.createElement("a");card.className="resource-card";card.href=url;card.target="_blank";card.rel="noopener noreferrer";card.dataset.description=description;card.dataset.category=kind;card.dataset.external=url;
      card.dataset.search=(name+" "+description+" "+kind+" "+keywords).toLowerCase();
      const image=document.createElement("img");image.className="app-icon";image.alt="";image.loading="lazy";
      image.src="https://cdn.simpleicons.org/"+icon+"/008060";
      image.onerror=()=>{image.src="https://cdn.simpleicons.org/google/4285F4";};
      const info=document.createElement("div");info.className="app-info";
      const title=document.createElement("h3");title.textContent=name;
      const desc=document.createElement("p");desc.textContent=description;
      const type=document.createElement("span");type.className="resource-kind";type.textContent=kind+" · Open resource ↗";
      info.append(title,desc,type);card.append(image,info);target.append(card);
    });
  }
  addResourceCards("google-tools-grid",googleTools);
  addResourceCards("shopify-tools-grid",shopifyTools);

  const search=document.getElementById("app-search");
  const cards=[...document.querySelectorAll(".app-card, .resource-card")];
  const modal=document.getElementById("app-details-modal");
  const closeDetails=()=>{modal.classList.add("hidden");modal.setAttribute("aria-hidden","true");};
  function openDetails(card){
    const title=card.querySelector("h3")?.textContent?.trim()||"App details";
    const description=card.dataset.description||card.querySelector(".app-info p")?.textContent?.trim()||"Explore this app or tool and learn how it can support your Shopify store.";
    const category=card.dataset.category|| (card.closest("#sponsored-apps")?"Sponsored app":card.closest("#spotlight-apps")?"Featured app":"Shopify app");
    const image=card.querySelector(".app-icon");
    const rating=card.querySelector(".app-meta")?.textContent?.trim()||"Rating and pricing details are available on the official listing.";
    const url=card.dataset.external||("https://www.google.com/search?q="+encodeURIComponent(title+" official website"));
    document.getElementById("details-title").textContent=title;
    document.getElementById("details-description").textContent=description;
    document.getElementById("details-category").textContent=category;
    document.getElementById("details-rating").textContent=rating;
    document.getElementById("details-benefit").textContent=description;
    document.getElementById("details-icon").src=image?.src||"https://cdn.simpleicons.org/shopify/7AB55C";
    document.getElementById("details-link").href=url;
    document.getElementById("details-link").textContent=card.dataset.external?"View official listing ↗":"Find official app information ↗";
    document.getElementById("cta-message").textContent="Payment link coming soon. You can still view the official listing.";
    modal.classList.remove("hidden");modal.setAttribute("aria-hidden","false");
    document.getElementById("details-close").focus();
  }
  cards.forEach(card=>{card.setAttribute("role","button");card.setAttribute("tabindex","0");card.addEventListener("click",event=>{event.preventDefault();openDetails(card);});card.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();openDetails(card);}});});
  document.getElementById("details-cta").addEventListener("click",()=>{
    const message=document.getElementById("cta-message");
    message.textContent="Thanks for your interest! The payment link will be added here soon.";
  });
  document.getElementById("details-close").addEventListener("click",closeDetails);
  modal.addEventListener("click",event=>{if(event.target===modal)closeDetails();});
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!modal.classList.contains("hidden"))closeDetails();});
  const noResults=document.getElementById("no-results");
  function filterApps(){
    const term=search.value.trim().toLowerCase();let visible=0;
    cards.forEach(card=>{
      const haystack=(card.dataset.search||"")+" "+card.innerText.toLowerCase();
      const match=!term||haystack.includes(term);
      card.classList.toggle("search-hidden",!match);if(match)visible++;
    });
    noResults.classList.toggle("hidden",visible!==0);
  }
  document.getElementById("search-form").addEventListener("submit",event=>{event.preventDefault();filterApps();});
  search.addEventListener("input",filterApps);
  const errorPanel=document.getElementById("connection-error");
  const statusPanel=document.getElementById("temporary-status");
  const countdown=document.getElementById("countdown");
  let sessionTimer=null,remaining=30;
  function showDisconnected(){
    closeDetails();
    if(sessionTimer){clearInterval(sessionTimer);sessionTimer=null;}
    document.querySelector(".store-content").classList.add("disconnected");
    statusPanel.classList.add("hidden");errorPanel.classList.remove("hidden");
  }
  function connectTemporary(){
    if(sessionTimer)clearInterval(sessionTimer);
    document.querySelector(".store-content").classList.remove("disconnected");
    errorPanel.classList.add("hidden");statusPanel.classList.remove("hidden");
    remaining=30;countdown.textContent=remaining;
    sessionTimer=setInterval(()=>{
      remaining--;countdown.textContent=remaining;
      if(remaining<=0)showDisconnected();
    },1000);
  }
  document.getElementById("retry-button").addEventListener("click",connectTemporary);
  startSequence().then(showDisconnected);
})();