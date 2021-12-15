import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex: sessionStorage.getItem('currentIndex') ? Number(sessionStorage.getItem('currentIndex')) : 0,
    playing: false,
    playList: sessionStorage.getItem('playList') ? JSON.parse(sessionStorage.getItem('playList')) : [
      {
        src: null,
        name: '声声慢 (京韵版)',
        id: 1485850351,
        pst: 0,
        t: 0,
        ar: [
          {
            id: 1049983,
            name: '张一山',
            tns: [],
            alias: []
          },
          {
            id: 37077708,
            name: '孙萍',
            tns: [],
            alias: []
          }
        ],
        alia: [
          '不曾遗忘的符号'
        ],
        pop: 100,
        st: 0,
        rt: '',
        fee: 8,
        v: 10,
        crbt: null,
        cf: '',
        al: {
          id: 96584820,
          name: '声声慢',
          picUrl: 'https://p1.music.126.net/0X0cvRif6qa0AE-yBibf7g==/109951165379412073.jpg',
          tns: [],
          pic_str: '109951165379412073',
          pic: 109951165379412080
        },
        dt: 265299,
        h: {
          br: 320000,
          fid: 0,
          size: 10614117,
          vd: -28278
        },
        m: {
          br: 192000,
          fid: 0,
          size: 6368488,
          vd: -25656
        },
        l: {
          br: 128000,
          fid: 0,
          size: 4245673,
          vd: -23927
        },
        a: null,
        cd: '01',
        no: 1,
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        djId: 0,
        copyright: 0,
        s_id: 0,
        mark: 8192,
        originCoverType: 0,
        originSongSimpleData: null,
        resourceState: true,
        single: 0,
        noCopyrightRcmd: null,
        rtype: 0,
        rurl: null,
        mst: 9,
        cp: 1418149,
        mv: 10961582,
        publishTime: 1602604800000
      }
    ],
    rank: sessionStorage.getItem('rank') ? JSON.parse(sessionStorage.getItem('rank')) : {
      subscribers: [],
      subscribed: null,
      creator: null,
      artists: null,
      tracks: [
        {
          first: '还是会想你',
          second: '林达浪/h3R3'
        },
        {
          first: '晚风',
          second: 'Copy/BT07-PZ'
        },
        {
          first: '给你呀（又名：for ya）',
          second: '蒋小呢'
        }
      ],
      updateFrequency: '每天更新',
      backgroundCoverId: 0,
      backgroundCoverUrl: null,
      titleImage: 0,
      titleImageUrl: null,
      englishTitle: null,
      opRecommend: false,
      recommendInfo: null,
      trackNumberUpdateTime: 1623543106202,
      adType: 0,
      subscribedCount: 11097359,
      cloudTrackCount: 0,
      userId: 1,
      highQuality: false,
      createTime: 1378721406014,
      coverImgId: 18708190348409092,
      updateTime: 1623543106375,
      trackCount: 200,
      coverImgUrl: 'https://p2.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg',
      specialType: 10,
      newImported: false,
      anonimous: false,
      totalDuration: 0,
      trackUpdateTime: 1623543106377,
      commentThreadId: 'A_PL_0_3778678',
      privacy: 0,
      playCount: 9102435328,
      tags: [],
      ordered: true,
      description: '云音乐热歌榜：云音乐用户一周内收听所有线上歌曲官方TOP排行榜，每日更新。',
      status: 0,
      name: '热歌榜',
      id: 3778678,
      coverImgId_str: '18708190348409091',
      ToplistType: 'H'
    },
    cookie: sessionStorage.getItem('cookie') ? sessionStorage.getItem('cookie') : null,
    profile: sessionStorage.getItem('profile') ? JSON.parse(sessionStorage.getItem('profile')) : {},
    likedList: [],
    likedSongs: []
  },
  mutations: {
    addToLikedList (state, val) {
      state.likedList.push(val)
    },
    delFromLikedList (state, index) {
      state.likedList.splice(index, 1)
    },
    setLikedList (state, val) {
      state.likedList = val
    },
    addToLikedSongs (state, val) {
      state.likedSongs.push(val)
    },
    delFromLikedSongs (state, index) {
      state.likedSongs.splice(index, 1)
    },
    setLikedSongs (state, val) {
      state.likedSongs = val
    },
    setCookieProfile (state, [cookie, profile]) {
      if (cookie === null) {
        state.cookie = null
        state.profile = {}
        sessionStorage.removeItem('cookie')
        sessionStorage.removeItem('profile')
      } else {
        state.cookie = cookie
        state.profile = profile
        sessionStorage.setItem('cookie', cookie)
        sessionStorage.setItem('profile', JSON.stringify(profile))
      }
    },
    setCurrentIndex (state, val) {
      state.currentIndex = val
      sessionStorage.setItem('currentIndex', val)
    },
    addToPlayList (state, item) {
      state.playList.push(Object.assign({ src: null }, item))
      sessionStorage.setItem('playList', JSON.stringify(state.playList))
    },
    delFromPlayList (state, index) {
      if (index < state.currentIndex) this.commit('setCurrentIndex', state.currentIndex - 1)
      state.playList.splice(index, 1)
      sessionStorage.setItem('playList', JSON.stringify(state.playList))
    },
    setPlaying (state, val) {
      state.playing = val
    },
    setCurrentSongSrc (state, src) {
      state.playList[state.currentIndex].src = src
    },
    setRank (state, rank) {
      state.rank = rank
      sessionStorage.setItem('rank', JSON.stringify(rank))
    }
  },
  actions: {},
  modules: {},
  getters: {
    currentSong: function (state) {
      return state.playList.length > 0 ? state.playList[state.currentIndex] : {
        src: null,
        name: '请添加歌曲',
        id: -1,
        pst: 0,
        t: 0,
        ar: [
          {
            id: 1049983,
            name: '请添加歌曲',
            tns: [],
            alias: []
          }
        ],
        alia: [
          '不曾遗忘的符号'
        ],
        pop: 100,
        st: 0,
        rt: '',
        fee: 8,
        v: 10,
        crbt: null,
        cf: '',
        al: {
          id: 96584820,
          name: '声声慢',
          picUrl: require('../assets/vinyl_record.jpg'),
          tns: [],
          pic_str: '109951165379412073',
          pic: 109951165379412080
        },
        dt: 265299,
        h: {
          br: 320000,
          fid: 0,
          size: 10614117,
          vd: -28278
        },
        m: {
          br: 192000,
          fid: 0,
          size: 6368488,
          vd: -25656
        },
        l: {
          br: 128000,
          fid: 0,
          size: 4245673,
          vd: -23927
        },
        a: null,
        cd: '01',
        no: 1,
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        djId: 0,
        copyright: 0,
        s_id: 0,
        mark: 8192,
        originCoverType: 0,
        originSongSimpleData: null,
        resourceState: true,
        single: 0,
        noCopyrightRcmd: null,
        rtype: 0,
        rurl: null,
        mst: 9,
        cp: 1418149,
        mv: 0,
        publishTime: 1602604800000
      }
    }
  }
})
