export default (name, index = false) => () => import (`content-view/${name}${index ? '/index' : ''}.vue`)
