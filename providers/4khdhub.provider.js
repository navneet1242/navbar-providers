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

      const html =
        await window.providerFetch(
          "https://4khdhub.link/"
        );

      console.log(
        "[4KHDHOME_HTML]",
        html.slice(0,500)
      );

      const doc =
        new DOMParser().parseFromString(
          html,
          "text/html"
        );

      const links = [
        ...doc.querySelectorAll("a")
      ];

      const items = [];

      for (const a of links) {

        if (items.length >= 5)
          break;

        const img =
          a.querySelector("img");

        if (!img)
          continue;

        const title =
          img.alt?.trim() ||
          a.title?.trim();

        const poster =
          img.src ||
          img.dataset?.src ||
          img.getAttribute("data-lazy-src");

        const url =
          a.href;

        // Required fields
        if (
          !title ||
          !poster ||
          !url
        ) continue;

        const t =
          title.toLowerCase();

        const p =
          poster.toLowerCase();

        // Skip site junk/logo/header assets
        if (
          t.includes("logo") ||
          p.includes("logo") ||
          p.includes("/images/") ||
          t.includes("4khdhub")
        ) continue;

        // Skip SVG/header assets
        if (
          poster.endsWith(".svg")
        ) continue;

        items.push({

          id:
            "4k-" + items.length,

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

  }

}