let API_HOSTNAME
if (process.env.NODE_ENV === 'production') {
  API_HOSTNAME = 'http://www.ckia.net.cn'
} else {
  API_HOSTNAME = 'http://192.168.31.157:8090'
}
export const SIGNUP_URL = `${API_HOSTNAME}/auth/signup`
export const SIGNIN_BYUSERNAME_URL = `${API_HOSTNAME}/auth/signin`
export const SIGNIN_BYPHONENUMBER_URL = `${API_HOSTNAME}/auth/signin_by_phonenumber`
export const VERIFICATE_URL = `${API_HOSTNAME}/auth/verificate`

export const BASE_USER_URL = `${API_HOSTNAME}/user/users`
export const BASE_POST_URL = `${API_HOSTNAME}/resource/recommend`
export const BASE_CONTENT_URL = `${API_HOSTNAME}/resource/content`
export const BASE_TOPIC_URL = `${API_HOSTNAME}/resource/topics`
export const BASE_CATEGORY_URL = `${API_HOSTNAME}/resource/categories`
export const BASE_LIKE_URL = `${API_HOSTNAME}/resource/likes`
export const BASE_COMMENT_URL = `${API_HOSTNAME}/resource/comments`

export const ADMIN_URL = API_HOSTNAME
