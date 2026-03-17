import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, md } from 'vuetify/iconsets/md'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

export default createVuetify({
	icons: { defaultSet: 'md', aliases, sets: { md } },
})
