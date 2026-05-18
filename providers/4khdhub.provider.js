export default {

  manifest() {
    return {
      id: "4khdhub",
      name: "4KHDHub",
      version: "1.0.0"
    };
  },

  async getHome() {

    try {

      console.log("[4KHDHOME_FETCH_BEGIN]");

      const response = await fetch(
        "https://4khdhub.link/",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0"
          }
        }
      );

      console.log(
        "[4KHDHOME_FETCH_STATUS]",
        response.status
      );

      const html = await response.text();

      console.log(
        "[4KHDHOME_HTML]",
        html.slice(0,500)
      );

      const doc =
        new DOMParser()
          .parseFromString(
            html,
            "text/html"
          );

      const links = [
        ...doc.querySelectorAll("a")
      ];

      const items = [];

      for (const a of links) {

        if(items.length >= 5)
          break;

        const img =
          a.querySelector("img");

        if(!img) continue;

        const title =
          img.alt?.trim() ||
          a.title?.trim();

        const poster =
          img.src ||
          img.dataset.src ||
          img.getAttribute("data-lazy-src");

        const url = a.href;

        if(
          !title ||
          !poster ||
          !url
        ) continue;

        items.push({

          id:
            "4k-" +
            items.length,

          title,

          poster,

          backdrop:
            poster,

          url,

          type:
            "movie"

        });

      }

      console.log(
        "[4KHDHOME_PARSED]",
        "count=",
        items.length
      );

      if(items.length){

        return {

          featured:[],

          rows:[
            {
              title:
                "Trending",

              items
            }
          ]

        };

      }

      throw new Error(
        "No cards parsed"
      );

    } catch(e){

      console.log(
        "[4KHDHOME_FALLBACK]",
        e?.message
      );

      return {

        featured:[],

        rows:[
          {
            title:
              "Provider Test",

            items:[
              {
                id:
                  "provider-test-1",

                title:
                  "Provider Connected",

                poster:
                  "https://picsum.photos/300/450",

                backdrop:
                  "https://picsum.photos/1280/720",

                type:
                  "movie"
              }
            ]
          }
        ]

      };

    }

  }

}