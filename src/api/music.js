import Axios from 'axios'
import message from '../components/Message/index'
import store from '../store'

const axios = Axios.create({
  baseURL: 'https://netease-cloud-music-api-eta-liard.vercel.app/'
})

function addParam (url, val) {
  if (url.includes('?')) return '&' + String(val)
  return '?' + String(val)
}

axios.interceptors.request.use(function (config) {
  config.url += addParam(config.url, 'realIP=112.10.182.31')
  if (store.state.cookie !== null) config.url += addParam(config.url, 'cookie=' + encodeURIComponent(store.state.cookie))
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  console.log(response)
  if (response.data.code !== 200) {
    message.error(response.data.msg)
  }
  return response
}, function (error) {
  message.error('网络连接失败')
  return Promise.reject(error)
})

function addTimestamp () {
  return '&timestamp=' + Math.floor(new Date())
}

export const music = {
  getMv (mvid) {
    return axios.get('/mv/url?id=' + mvid)
  },
  getPersonalized () {
    return axios.get('/personalized?limit=10')
  },
  setLiked (id, like) {
    return axios.get('/like?id=' + id + '&like=' + (like === true ? 'true' : 'false') + addTimestamp())
  },
  getLiked (uid) {
    return axios.get('/likelist?uid=' + uid + addTimestamp())
  },
  logout () {
    return axios.get('/logout', {
      params: {
        timestamp: Math.floor(new Date())
      }
    })
  },
  loginPhone (phone, password) {
    return axios.get('/login/cellphone?phone=' + phone + '&password=' + encodeURIComponent(password) + addTimestamp())
  },
  loginCaptcha (phone) {
    return axios.get('/captcha/sent?phone=' + phone)
  },
  checkCaptcha (phone, captcha) {
    return axios.get('/captcha/verify?phone=' + phone + '&captcha=' + captcha)
  },
  getComment (id) {
    return axios.get('/comment/music?id=' + id + '&limit=20')
  },
  getSearchSuggest (keyword) {
    return axios.get('/search/suggest?keywords=' + keyword + '&type=mobile')
  },
  getTopList () {
    return axios.get('/toplist/detail')
  },
  getPlayList (id) {
    return axios.get('/playlist/detail?id=' + id)
  },
  getSongDetail (ids) {
    return axios.get('/song/detail?ids=' + ids.join(','))
  },
  getSongUrl (id) {
    return axios.get('/song/url?id=' + id)
  },
  getSongLyric (id) {
    return axios.get('/lyric?id=' + id)
  },
  searchSong (keywords) {
    return axios.get('/cloudsearch?keywords=' + keywords)
  },
  searchHot () {
    return axios.get('/search/hot')
  },
  getBanner () {
    return axios.get('/banner?type=1')
  }
}
