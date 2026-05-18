export default {

  manifest() {
    return {
      id:"4khdhub",
      name:"4KHDHub",
      version:"1.0.0"
    }
  },

  getHome(){

    return {

      featured:[],

      rows:[
        {
          title:"Provider Test",

          items:[
            {
              id:"provider-test-1",

              title:"Provider Connected",

              poster:"https://picsum.photos/300/450",

              backdrop:"https://picsum.photos/1280/720",

              type:"movie"
            }
          ]
        }
      ]

    }

  }

}