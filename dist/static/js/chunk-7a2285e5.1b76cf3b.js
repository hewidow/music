(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a2285e5"],{"200d":function(t,a,n){},"9f46":function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("i-top-bar",{attrs:{"app-title":"视频"},scopedSlots:t._u([{key:"main",fn:function(){return[n("v-container",{staticClass:"fill-height"},[n("v-row",[n("v-col",{staticClass:"text-center pa-0"},[n("video",{attrs:{controls:"",autoplay:"",id:"myVideo"}},[t._v(" 您的浏览器不支持 video 标签。 ")])])],1),n("v-row",[n("v-col",[n("div",{staticClass:"primaryText--text"},[t._v(t._s(t.currentSong.name))]),n("div",{staticClass:"secondaryText--text"},[t._v(t._s(t.currentSong.ar.map((function(t){return t.name})).join("/")))])])],1)],1)]},proxy:!0}])})},r=[],o=n("1857"),i=n("a028"),c={name:"MusicMovie",components:{iTopBar:i["a"]},computed:{currentSong:function(){return this.$store.getters.currentSong}},data:function(){return{}},mounted:function(){this.getMv()},methods:{getMv:function(){o["a"].getMv(this.currentSong.mv).then((function(t){document.getElementById("myVideo").src=t.data.data.url}))}}},s=c,u=(n("ff18"),n("2877")),p=n("6544"),l=n.n(p),d=n("62ad"),f=n("a523"),v=n("0fd9"),m=Object(u["a"])(s,e,r,!1,null,"4e6af1f8",null);a["default"]=m.exports;l()(m,{VCol:d["a"],VContainer:f["a"],VRow:v["a"]})},a028:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",[n("v-app-bar",{attrs:{flat:"",color:"primary",app:""}},[n("v-btn",{attrs:{icon:"",color:"primaryText"},on:{click:function(a){return t.$router.back()}}},[n("v-icon",{attrs:{size:"24"}},[t._v("mdi-arrow-left")])],1),n("v-app-bar-title",{staticClass:"primaryText--text font-weight-bold"},[t._v(t._s(t.appTitle))]),t._t("titleAppend")],2),n("i-background-image"),n("v-main",{staticClass:"pa-0"},[t._t("main")],2)],1)},r=[],o=n("101e"),i={name:"iTopBar",components:{iBackgroundImage:o["a"]},props:{appTitle:{type:String,default:""}}},c=i,s=n("2877"),u=n("6544"),p=n.n(u),l=n("40dc"),d=n("bb78"),f=n("8336"),v=n("132d"),m=n("f6c4"),g=Object(s["a"])(c,e,r,!1,null,"7a8a372a",null);a["a"]=g.exports;p()(g,{VAppBar:l["a"],VAppBarTitle:d["a"],VBtn:f["a"],VIcon:v["a"],VMain:m["a"]})},ff18:function(t,a,n){"use strict";n("200d")}}]);
//# sourceMappingURL=chunk-7a2285e5.1b76cf3b.js.map