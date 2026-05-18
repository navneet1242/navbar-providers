export default {
  manifest() {
    return {
      id:"4khdhub",
      name:"4KHDHub",
      version:"1.0.0"
    }
  },

  async getHome() {
    try {

      console.log("[4KHDHOME_FETCH_BEGIN]");

      const r = await fetch(
        "https://4khdhub.link/"
      );

      console.log(
        "[4KHDHOME_FETCH_STATUS]",
        r.status
      );

      const html = await r.text();

      console.log(
        "[4KHDHOME_HTML]",
        html.slice(0,500)
      );

      return {
        featured:[],
        rows:[]
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