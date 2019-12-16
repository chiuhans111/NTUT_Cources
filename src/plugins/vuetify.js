import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { colors } from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.shades.white,
                secondary: colors.shades.black,
                success: colors.cyan.base
            }
        }
    },
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    },
})
