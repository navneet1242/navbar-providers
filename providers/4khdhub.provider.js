export default {

  manifest() {
    return {
      id:"4khdhub",
      name:"4KHDHub",
      version:"1.0.0"
    };
  },

  async getHome(){

    try{

      const html=
        await window.providerFetch(
          "https://4khdhub.link/"
        );

      const doc=
        new DOMParser()
          .parseFromString(
            html,
            "text/html"
          );

      const links=[
        ...doc.querySelectorAll("a")
      ];

      const items=[];

      for(const a of links){

        if(items.length>=5)
          break;

        const img=
          a.querySelector("img");

        if(!img) continue;

        const title=
          img.alt?.trim() ||
          a.title?.trim();

        const poster=
          img.src ||
          img.dataset?.src ||
          img.getAttribute(
            "data-lazy-src"
          );

        const pageUrl=
          new URL(
            a.getAttribute("href"),
            "https://4khdhub.link"
          ).href;

        console.log(
          "[PAGEURL_NORMALIZED]",
          pageUrl
        );

        if(
          !title ||
          !poster ||
          !pageUrl
        ) continue;

        const t=
          title.toLowerCase();

        const p=
          poster.toLowerCase();

        if(
          t.includes("logo") ||
          p.includes("logo") ||
          p.includes("/images/")
        ) continue;

        items.push({

          id:
            "4k-"+items.length,

          title,

          poster,

          backdrop:
            poster,

          pageUrl,

          type:"movie"

        });

      }

      return{
        featured:items.slice(0,1),
        rows:[
          {
            title:"Trending",
            items
          }
        ]
      };

    }catch(e){

      return{
        featured:[],
        rows:[]
      };

    }

  },

  async getDetails(item){

    console.log(
      "[DETAIL_IN]",
      item
    );

    const details={
      ...item,

      pageUrl:
        item.pageUrl ||
        item.sourceUrl,

      sourceUrl:
        item.sourceUrl ||
        item.pageUrl,

      description:
        "Loaded from 4KHDHub"
    };

    console.log(
      "[DETAIL_OUT]",
      details
    );

    return details;

  },

  async getSources(content){

    console.log(
      "[SOURCES_CONTENT]",
      content
    );

    console.log(
      "[SOURCES_PAGEURL]",
      content?.pageUrl
    );

    try{

      const extracted=
        await extractContent(
          content.pageUrl ||
          content.sourceUrl
        );

      console.log(
        "[EXTRACT_CONTENT_RESULT]",
        extracted
      );

      let hubLink=null;

      if(
        extracted?.type==="movie" &&
        extracted.groups?.length
      ){
        hubLink=
          extracted.groups[0]?.url;
      }

      if(
        extracted?.type==="series" &&
        extracted.seasons?.length
      ){
        hubLink=
          extracted.seasons[0]
            ?.episodes?.[0]
            ?.qualities?.[0]
            ?.url;
      }

      if(
        !hubLink ||
        !/hubcloud|hubdrive/i.test(hubLink)
      ){
        return{
          sources:[]
        };
      }

      const finalUrl=
        await resolveStream(
          hubLink
        );

      console.log(
        "[REAL_STREAM_RESULT]",
        finalUrl
      );

      return{

        sources:[
          {
            url:
              finalUrl,

            quality:
              "Auto"
          }
        ]

      };

    }catch(e){

      console.log(
        "[REAL_STREAM_RESULT]",
        e?.message
      );

      return{
        sources:[]
      };

    }

  }

}
