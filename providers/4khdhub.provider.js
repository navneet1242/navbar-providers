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

      console.log("[4KHDHOME_FETCH_BEGIN]");

      const html =
        await window.providerFetch(
          "https://4khdhub.link/"
        );

      console.log(
        "[4KHDHOME_HTML]",
        html.slice(0,500)
      );

      // inspect if app data exists in scripts

      const movieMatches =
        html.match(
          /"title"\s*:\s*"[^"]+"/g
        ) || [];

      console.log(
        "[RAW_TITLE_MATCHES]",
        movieMatches.length
      );

      console.log(
        "[RAW_TITLE_PREVIEW]",
        movieMatches.slice(0,10)
      );

      return {

        featured:[],

        rows:[
          {
            title:"Diagnostics",
            items:[]
          }
        ]

      };

    }catch(e){

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

    return {
      ...item,
      description:"Loaded from 4KHDHub"
    };

  },

  async getSources(content){

    return {

      sources:[
        {
          url:
          "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          quality:"1080p"
        }
      ]

    };

  }

}