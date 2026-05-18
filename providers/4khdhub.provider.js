export default {

  manifest() {
    return {
      id:"4khdhub",
      name:"4KHDHub",
      version:"1.0.0"
    };
  },

  async getHome() {

    try {

      console.log(
        "[4KHDHOME_FETCH_BEGIN]"
      );

      const html=
        await window.providerFetch(
          "https://4khdhub.link/"
        );

      console.log(
        "[4KHDHOME_HTML]",
        html.slice(0,500)
      );

      const doc=
        new DOMParser()
          .parseFromString(
            html,
            "text/html"
          );

      const links=[
        ...doc.querySelectorAll(
          "a[href]"
        )
      ];

      const items=[];

      for(const a of links){

        if(items.length>=5)
          break;

        const img=
          a.querySelector(
            "img"
          );

        if(!img)
          continue;

        const title=
          img.alt?.trim() ||
          a.title?.trim() ||
          a.textContent?.trim();

        const pageUrl=
          a.href;

        const poster=
          img.src ||
          img.dataset?.src ||
          img.getAttribute(
            "data-lazy-src"
          ) ||
          img.getAttribute(
            "src"
          );

        console.log(
          "[CARD_FOUND]",
          title,
          pageUrl
        );

        if(
          !title ||
          !poster ||
          !pageUrl
        )
          continue;

        const t=
          title.toLowerCase();

        const p=
          poster.toLowerCase();

        if(
          t.includes("logo") ||
          p.includes("logo") ||
          p.includes("/images/")
        )
          continue;

        items.push({

          id:
            "4k-"+items.length,

          title,

          poster,

          backdrop:
            poster,

          pageUrl,

          type:
            "movie"

        });

      }

      console.log(
        "[4KHDHOME_PARSED]",
        items.length
      );

      return {

        featured:
          items.slice(0,1),

        rows:[
          {
            title:"Trending",
            items
          }
        ]

      };

    } catch(e){

      console.log(
        "[4KHDHOME_FALLBACK]",
        e?.message
      );

      return {

        featured:[],
        rows:[]

      };

    }

  },

  async getDetails(item){

    console.log(
      "[DETAILS_BEGIN]",
      item?.pageUrl
    );

    return {

      ...item,

      description:
        "Loaded from 4KHDHub"

    };

  },

  async getSources(content){

    console.log(
      "[SOURCES_BEGIN]",
      {
        pageUrl:
        content?.pageUrl
      }
    );

    return {

      sources:[
        {
          url:
          "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",

          quality:
          "1080p"
        }
      ]

    };

  }

}