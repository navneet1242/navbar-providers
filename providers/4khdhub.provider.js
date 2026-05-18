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

      const html =
        await window.providerFetch(
          "https://4khdhub.link/"
        );

      const doc =
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

        if(!img)
          continue;

        const title=
          img.alt?.trim() ||
          a.title?.trim();

        const poster=
          img.src ||
          img.dataset?.src ||
          img.getAttribute(
            "data-lazy-src"
          );

        const url=a.href;

        if(
          !title ||
          !poster ||
          !url
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

          id:"4k-"+items.length,

          title,

          poster,

          backdrop:poster,

          url,

          type:"movie"

        });

      }

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
      item?.title
    );

    return {

      id:item.id,

      title:item.title,

      poster:item.poster,

      backdrop:item.backdrop,

      description:
        "Loaded from 4KHDHub",

      year:
        new Date()
          .getFullYear(),

      genres:[],

      type:"movie"

    };

  },

  async getSources(contentId){

    console.log(
      "[SOURCES_BEGIN]",
      contentId
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