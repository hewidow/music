(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00193659"],{"49ff":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("i-top-bar",{attrs:{"app-title":"音乐排行榜"},scopedSlots:t._u([{key:"main",fn:function(){return[e("i-overlay",{attrs:{overlay:t.overlay,"z-index":0}}),e("v-container",[e("v-row",{attrs:{dense:""}},t._l(t.topList,(function(a,r){return e("v-col",{key:r,attrs:{cols:a.tracks.length>0?12:4},on:{click:function(e){return t.openRankList(a)}}},[e("v-container",{staticClass:"pa-0"},[e("v-row",{staticClass:"text-center mb-4 rounded-lg",style:{backgroundColor:a.tracks.length>0?t.$vuetify.theme.themes.light.cardBg:""},attrs:{"no-gutters":""}},[e("v-col",{staticClass:"pa-0",attrs:{cols:0===a.tracks.length?12:4,"align-self":"center"}},[e("v-badge",{attrs:{color:"secondary",overlap:"",content:t.NumberToString(a.playCount),bottom:"","offset-x":0===a.tracks.length?80:100}},[e("v-avatar",{attrs:{rounded:"",size:0===a.tracks.length?80:100}},[e("v-img",{attrs:{"aspect-ratio":"1.0",src:a.coverImgUrl}})],1)],1)],1),a.tracks.length>0?e("v-col",{staticClass:"text-start",attrs:{cols:"8"}},[e("div",{staticClass:"primaryText--text"},[e("span",{staticClass:"primaryText--text subtitle-1"},[t._v(t._s(a.name))]),e("span",{staticClass:"primaryText--text caption"},[t._v("_"+t._s(a.updateFrequency))])]),t._l(a.tracks,(function(a,r){return e("div",{key:r},[e("div",{staticClass:"text-truncate"},[e("span",{staticClass:"primaryText--text subtitle-2"},[t._v(t._s(r+1)+". "+t._s(a.first)+" - ")]),e("span",{staticClass:"secondaryText--text subtitle-2"},[t._v(t._s(a.second))])])])}))],2):t._e()],1),0===a.tracks.length?e("div",{staticClass:"text-center primaryText--text"},[t._v(t._s(a.name))]):t._e()],1)],1)})),1),e("v-row",[e("v-col")],1),e("v-row",[e("v-col")],1),e("v-row",[e("v-col")],1)],1)]},proxy:!0}])})},n=[],s=(e("a9e3"),e("1857")),o=e("a028"),i=e("bdc9"),c={name:"MusicRank",components:{iTopBar:o["a"],iOverlay:i["a"]},props:{playList:{type:Array,default:function(){return[]}},playId:{type:Number,default:-1},playing:{type:Boolean,default:!1},showDialog:{type:Boolean,default:!1}},data:function(){return{topList:[],rankList:[],overlay:!1}},mounted:function(){this.getTopList()},methods:{openRankList:function(t){this.$store.commit("setRank",t),this.$router.push("/music/rankList")},addToPlayList:function(t){this.$store.commit("addToPlayList",t)},clickPlayIcon:function(t){this.$emit("clickPlayIcon",t)},NumberToString:function(t){return t<1e4?String(t):t<1e8?String(Math.floor(t/1e4))+"万":String(Math.floor(t/1e8))+"亿"},getTopList:function(){var t=this;this.overlay=!0,s["a"].getTopList().then((function(a){t.topList=a.data.list,t.overlay=!1}))}}},l=c,p=e("2877"),u=e("6544"),d=e.n(u),v=e("8212"),f=e("4ca6"),m=e("62ad"),y=e("a523"),g=e("adda"),h=e("0fd9"),k=Object(p["a"])(l,r,n,!1,null,"60f44da4",null);a["default"]=k.exports;d()(k,{VAvatar:v["a"],VBadge:f["a"],VCol:m["a"],VContainer:y["a"],VImg:g["a"],VRow:h["a"]})},a028:function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("v-app-bar",{attrs:{flat:"",color:"primary",app:""}},[e("v-btn",{attrs:{icon:"",color:"primaryText"},on:{click:function(a){return t.$router.back()}}},[e("v-icon",{attrs:{size:"24"}},[t._v("mdi-arrow-left")])],1),e("v-app-bar-title",{staticClass:"primaryText--text font-weight-bold"},[t._v(t._s(t.appTitle))]),t._t("titleAppend")],2),e("i-background-image"),e("v-main",{staticClass:"pa-0"},[t._t("main")],2)],1)},n=[],s=e("101e"),o={name:"iTopBar",components:{iBackgroundImage:s["a"]},props:{appTitle:{type:String,default:""}}},i=o,c=e("2877"),l=e("6544"),p=e.n(l),u=e("40dc"),d=e("bb78"),v=e("8336"),f=e("132d"),m=e("f6c4"),y=Object(c["a"])(i,r,n,!1,null,"7a8a372a",null);a["a"]=y.exports;p()(y,{VAppBar:u["a"],VAppBarTitle:d["a"],VBtn:v["a"],VIcon:f["a"],VMain:m["a"]})}}]);
//# sourceMappingURL=chunk-00193659.d56d1df1.js.map