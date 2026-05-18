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

      console.log(
        "[4KHDHOME_FETCH_BEGIN]"
      );

      console.log(
        "[PF_EXISTS]",
        typeof window.providerFetch
      );

      const html =
        await window.providerFetch(
          "https://4khdhub.link/"
        );

      console.log(
        "[4KHDHOME_HTML]",
        html?.slice(0,500)
      );

      // Temporary test response only
      // We are NOT parsing yet

      return {

        featured:[],

        rows:[
          {
            title:"Bridge Working",

            items:[
              {
                id:"bridge-test",

                title:"TAURI FETCH SUCCESS",

                poster:
                  "https://picsum.photos/300/450?bridge",

                backdrop:
                  "https://picsum.photos/1280/720?bridge",

                type:"movie"
              }
            ]
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