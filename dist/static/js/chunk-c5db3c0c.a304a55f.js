(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c5db3c0c"],{"1f09":function(t,e,i){},3129:function(t,e,i){"use strict";var a=i("3835"),n=i("5530"),s=(i("ac1f"),i("1276"),i("d81d"),i("a630"),i("3ca3"),i("5319"),i("1f09"),i("c995")),r=i("24b2"),o=i("7560"),l=i("58df"),c=i("80d2");e["a"]=Object(l["a"])(s["a"],r["a"],o["a"]).extend({name:"VSkeletonLoader",props:{boilerplate:Boolean,loading:Boolean,tile:Boolean,transition:String,type:String,types:{type:Object,default:function(){return{}}}},computed:{attrs:function(){return this.isLoading?this.boilerplate?{}:Object(n["a"])({"aria-busy":!0,"aria-live":"polite",role:"alert"},this.$attrs):this.$attrs},classes:function(){return Object(n["a"])(Object(n["a"])({"v-skeleton-loader--boilerplate":this.boilerplate,"v-skeleton-loader--is-loading":this.isLoading,"v-skeleton-loader--tile":this.tile},this.themeClasses),this.elevationClasses)},isLoading:function(){return!("default"in this.$scopedSlots)||this.loading},rootTypes:function(){return Object(n["a"])({actions:"button@2",article:"heading, paragraph",avatar:"avatar",button:"button",card:"image, card-heading","card-avatar":"image, list-item-avatar","card-heading":"heading",chip:"chip","date-picker":"list-item, card-heading, divider, date-picker-options, date-picker-days, actions","date-picker-options":"text, avatar@2","date-picker-days":"avatar@28",heading:"heading",image:"image","list-item":"text","list-item-avatar":"avatar, text","list-item-two-line":"sentences","list-item-avatar-two-line":"avatar, sentences","list-item-three-line":"paragraph","list-item-avatar-three-line":"avatar, paragraph",paragraph:"text@3",sentences:"text@2",table:"table-heading, table-thead, table-tbody, table-tfoot","table-heading":"heading, text","table-thead":"heading@6","table-tbody":"table-row-divider@6","table-row-divider":"table-row, divider","table-row":"table-cell@6","table-cell":"text","table-tfoot":"text@2, avatar@2",text:"text"},this.types)}},methods:{genBone:function(t,e){return this.$createElement("div",{staticClass:"v-skeleton-loader__".concat(t," v-skeleton-loader__bone")},e)},genBones:function(t){var e=this,i=t.split("@"),n=Object(a["a"])(i,2),s=n[0],r=n[1],o=function(){return e.genStructure(s)};return Array.from({length:r}).map(o)},genStructure:function(t){var e=[];t=t||this.type||"";var i=this.rootTypes[t]||"";if(t===i);else{if(t.indexOf(",")>-1)return this.mapBones(t);if(t.indexOf("@")>-1)return this.genBones(t);i.indexOf(",")>-1?e=this.mapBones(i):i.indexOf("@")>-1?e=this.genBones(i):i&&e.push(this.genStructure(i))}return[this.genBone(t,e)]},genSkeleton:function(){var t=[];return this.isLoading?t.push(this.genStructure()):t.push(Object(c["m"])(this)),this.transition?this.$createElement("transition",{props:{name:this.transition},on:{afterEnter:this.resetStyles,beforeEnter:this.onBeforeEnter,beforeLeave:this.onBeforeLeave,leaveCancelled:this.resetStyles}},t):t},mapBones:function(t){return t.replace(/\s/g,"").split(",").map(this.genStructure)},onBeforeEnter:function(t){this.resetStyles(t),this.isLoading&&(t._initialStyle={display:t.style.display,transition:t.style.transition},t.style.setProperty("transition","none","important"))},onBeforeLeave:function(t){t.style.setProperty("display","none","important")},resetStyles:function(t){t._initialStyle&&(t.style.display=t._initialStyle.display||"",t.style.transition=t._initialStyle.transition,delete t._initialStyle)}},render:function(t){return t("div",{staticClass:"v-skeleton-loader",attrs:this.attrs,on:this.$listeners,class:this.classes,style:this.isLoading?this.measurableStyles:void 0},[this.genSkeleton()])}})},"63b7":function(t,e,i){},bb51:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-app-bar",{attrs:{"max-height":"48",height:"48",color:"primary",elevation:"0",app:"",flat:""}},[i("v-tabs",{attrs:{"active-class":"font-weight-bold text-h6","slider-color":"accent","slider-size":"4"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[i("v-tab",{staticClass:"primaryText--text subtitle-1 text-center"},[t._v("推荐")]),i("v-tab",{staticClass:"primaryText--text subtitle-1 text-center"},[t._v("音乐馆")])],1)],1),i("i-background-image"),i("v-main",{staticClass:"pa-0"},[i("i-search-song"),i("v-tabs-items",{staticStyle:{"background-color":"rgba(0,0,0,0)"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[i("v-tab-item",[i("music-recommend",{on:{clickPlayIcon:t.clickPlayIcon}})],1),i("v-tab-item",[i("music-pavilion",{on:{clickPlayIcon:t.clickPlayIcon}})],1)],1)],1)],1)},n=[],s=i("e89b"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",[i("v-row",[i("v-col",[0===t.posts.length?i("v-skeleton-loader",{attrs:{height:"150",type:"image"}}):i("v-carousel",{attrs:{cycle:"",interval:"3000","show-arrows":!1,height:"150","hide-delimiters":"","hide-delimiter-background":""}},t._l(t.posts,(function(t,e){return i("v-carousel-item",{key:e},[i("v-img",{attrs:{src:t.pic}})],1)})),1)],1)],1),i("v-row",[i("v-col",{attrs:{cols:"3"},on:{click:t.openMusicRank}},[i("div",{staticClass:"text-center"},[i("v-icon",{attrs:{color:"accent",size:"36"}},[t._v("mdi-equalizer")])],1),i("div",{staticClass:"primaryText--text text-center"},[t._v("排行")])])],1)],1)},o=[],l=i("1857"),c={name:"MusicPavilion",created:function(){this.getBanner()},data:function(){return{posts:[]}},methods:{getBanner:function(){var t=this;l["a"].getBanner().then((function(e){t.posts=e.data.banners}))},clickPlayIcon:function(t){this.$emit("clickPlayIcon",t)},openMusicRank:function(){this.$router.push("/music/rank")}}},u=c,d=i("2877"),h=i("6544"),m=i.n(h),p=i("5530"),v=(i("a9e3"),i("63b7"),i("f665")),g=i("afdd"),f=i("9d26"),b=i("37c6"),y=i("604c"),k=y["a"].extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return y["a"].options.computed.classes.call(this)}},methods:{genData:y["a"].options.methods.genData}}),x=i("80d2"),S=i("d9bd"),w=v["a"].extend({name:"v-carousel",props:{continuous:{type:Boolean,default:!0},cycle:Boolean,delimiterIcon:{type:String,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:function(t){return t>0}},mandatory:{type:Boolean,default:!0},progress:Boolean,progressColor:String,showArrows:{type:Boolean,default:!0},verticalDelimiters:{type:String,default:void 0}},provide:function(){return{parentTheme:this.theme}},data:function(){return{internalHeight:this.height,slideTimeout:void 0}},computed:{classes:function(){return Object(p["a"])(Object(p["a"])({},v["a"].options.computed.classes.call(this)),{},{"v-carousel":!0,"v-carousel--hide-delimiter-background":this.hideDelimiterBackground,"v-carousel--vertical-delimiters":this.isVertical})},isDark:function(){return this.dark||!this.light},isVertical:function(){return null!=this.verticalDelimiters}},watch:{internalValue:"restartTimeout",interval:"restartTimeout",height:function(t,e){t!==e&&t&&(this.internalHeight=t)},cycle:function(t){t?this.restartTimeout():(clearTimeout(this.slideTimeout),this.slideTimeout=void 0)}},created:function(){this.$attrs.hasOwnProperty("hide-controls")&&Object(S["a"])("hide-controls",':show-arrows="false"',this)},mounted:function(){this.startTimeout()},methods:{genControlIcons:function(){return this.isVertical?null:v["a"].options.methods.genControlIcons.call(this)},genDelimiters:function(){return this.$createElement("div",{staticClass:"v-carousel__controls",style:{left:"left"===this.verticalDelimiters&&this.isVertical?0:"auto",right:"right"===this.verticalDelimiters?0:"auto"}},[this.genItems()])},genItems:function(){for(var t=this,e=this.items.length,i=[],a=0;a<e;a++){var n=this.$createElement(g["a"],{staticClass:"v-carousel__controls__item",attrs:{"aria-label":this.$vuetify.lang.t("$vuetify.carousel.ariaLabel.delimiter",a+1,e)},props:{icon:!0,small:!0,value:this.getValue(this.items[a],a)}},[this.$createElement(f["a"],{props:{size:18}},this.delimiterIcon)]);i.push(n)}return this.$createElement(k,{props:{value:this.internalValue,mandatory:this.mandatory},on:{change:function(e){t.internalValue=e}}},i)},genProgress:function(){return this.$createElement(b["a"],{staticClass:"v-carousel__progress",props:{color:this.progressColor,value:(this.internalIndex+1)/this.items.length*100}})},restartTimeout:function(){this.slideTimeout&&clearTimeout(this.slideTimeout),this.slideTimeout=void 0,window.requestAnimationFrame(this.startTimeout)},startTimeout:function(){this.cycle&&(this.slideTimeout=window.setTimeout(this.next,+this.interval>0?+this.interval:6e3))}},render:function(t){var e=v["a"].options.render.call(this,t);return e.data.style="height: ".concat(Object(x["f"])(this.height),";"),this.hideDelimiters||e.children.push(this.genDelimiters()),(this.progress||this.progressColor)&&e.children.push(this.genProgress()),e}}),_=i("1e6c"),T=i("adda"),C=i("58df"),V=i("1c87"),O=Object(C["a"])(_["a"],V["a"]),$=O.extend().extend({name:"v-carousel-item",inject:{parentTheme:{default:{isDark:!1}}},provide:function(){return{theme:this.parentTheme}},inheritAttrs:!1,methods:{genDefaultSlot:function(){return[this.$createElement(T["a"],{staticClass:"v-carousel__item",props:Object(p["a"])(Object(p["a"])({},this.$attrs),{},{height:this.windowGroup.internalHeight}),on:this.$listeners,scopedSlots:{placeholder:this.$scopedSlots.placeholder}},Object(x["m"])(this))]},genWindowItem:function(){var t=this.generateRouteLink(),e=t.tag,i=t.data;return i.staticClass="v-window-item",i.directives.push({name:"show",value:this.isActive}),this.$createElement(e,i,this.genDefaultSlot())}}}),B=i("62ad"),j=i("a523"),I=i("132d"),P=i("0fd9"),L=i("3129"),A=Object(d["a"])(u,r,o,!1,null,"398382a0",null),D=A.exports;m()(A,{VCarousel:w,VCarouselItem:$,VCol:B["a"],VContainer:j["a"],VIcon:I["a"],VImg:T["a"],VRow:P["a"],VSkeletonLoader:L["a"]});var E=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"12"}},[i("span",{staticClass:"primaryText--text subtitle-1"},[t._v("热门推荐")])]),i("v-col",{attrs:{cols:"12"}},[t.loading?i("v-slide-group",t._l(10,(function(t){return i("v-slide-item",{key:t},[i("v-skeleton-loader",{staticClass:"ma-2",attrs:{type:"image",width:"100",height:"100"}})],1)})),1):i("v-slide-group",t._l(t.recommends,(function(e,a){return i("v-slide-item",{key:a},[i("div",{staticClass:"ma-2",on:{click:function(i){return t.openRecommendList(e)}}},[i("v-badge",{attrs:{color:"secondary",overlap:"",content:t.NumberToString(e.playCount),bottom:"","offset-x":"100"}},[i("v-avatar",{attrs:{rounded:"",size:"100"}},[i("v-img",{attrs:{"aspect-ratio":"1.0",src:e.picUrl}})],1)],1),i("div",{staticClass:"primaryText--text text-truncate mt-2",staticStyle:{width:"100px"}},[t._v(t._s(e.name))])],1)])})),1)],1)],1)],1)},R=[],M={name:"MusicRecommend",data:function(){return{loading:!1,recommends:[]}},mounted:function(){this.getPersonalized()},methods:{getPersonalized:function(){var t=this;this.loading=!0,l["a"].getPersonalized().then((function(e){t.loading=!1,t.recommends=e.data.result}))},openRecommendList:function(t){this.$store.commit("setRank",t),this.$router.push("/music/rankList")},NumberToString:function(t){return t<1e4?String(t):t<1e8?String(Math.floor(t/1e4))+"万":String(Math.floor(t/1e8))+"亿"}}},z=M,G=i("8212"),H=i("4ca6"),N=i("7efd"),q=i("ade3"),J=i("4e82"),F=i("2b0e"),U=F["a"].extend({props:{activeClass:String,value:{required:!1}},data:function(){return{isActive:!1}},methods:{toggle:function(){this.isActive=!this.isActive}},render:function(){return this.$scopedSlots.default?(this.$scopedSlots.default&&(t=this.$scopedSlots.default({active:this.isActive,toggle:this.toggle})),Array.isArray(t)&&1===t.length&&(t=t[0]),t&&!Array.isArray(t)&&t.tag?(t.data=this._b(t.data||{},t.tag,{class:Object(q["a"])({},this.activeClass,this.isActive)}),t):(Object(S["c"])("v-item should only contain a single element",this),t)):(Object(S["c"])("v-item is missing a default scopedSlot",this),null);var t}}),W=(Object(C["a"])(U,Object(J["a"])("itemGroup","v-item","v-item-group")).extend({name:"v-item"}),Object(C["a"])(U,Object(J["a"])("slideGroup")).extend({name:"v-slide-item"})),K=Object(d["a"])(z,E,R,!1,null,"47f244f6",null),Q=K.exports;m()(K,{VAvatar:G["a"],VBadge:H["a"],VCol:B["a"],VContainer:j["a"],VImg:T["a"],VRow:P["a"],VSkeletonLoader:L["a"],VSlideGroup:N["b"],VSlideItem:W});var X=i("101e"),Y={name:"Home",components:{iBackgroundImage:X["a"],iSearchSong:s["a"],MusicPavilion:D,MusicRecommend:Q},data:function(){return{tab:0}},methods:{clickPlayIcon:function(t){this.$emit("clickPlayIcon",t)}}},Z=Y,tt=i("40dc"),et=i("f6c4"),it=i("71a3"),at=i("c671"),nt=i("fe57"),st=i("aac8"),rt=Object(d["a"])(Z,a,n,!1,null,"c2dbdb7e",null);e["default"]=rt.exports;m()(rt,{VAppBar:tt["a"],VMain:et["a"],VTab:it["a"],VTabItem:at["a"],VTabs:nt["a"],VTabsItems:st["a"]})}}]);
//# sourceMappingURL=chunk-c5db3c0c.a304a55f.js.map