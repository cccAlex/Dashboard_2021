import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    state() {
        return {
            token: null,
            sideBarOpen: false,
            widgets: [],
            imgur: {
                logged_in: false,
                access_token: '',
                account_id: '',
                account_username: '',
                refresh_token: '',
            }
        }
    },
    getters: {
        sideBarOpen: state => {
            return state.sideBarOpen
        },
        getJWToken: state => {
            return state.token
        },
        getWidgets: state => {
            return state.widgets
        },
        getImgur: state => {
            return state.imgur
        }
    },
    mutations: {
        setJWToken(state, token) {
            state.token = token
        },
        toggleSidebar (state) {
            state.sideBarOpen = !state.sideBarOpen
        },
        removeJWToken(state) {
            state.token = null
        },
        emptyWidgets(state) {
            state.widgets = []
        },
        setWidgets(state, widgets) {
            state.widgets = widgets
        },
        setImgur(state, imgur) {
            state.imgur = imgur
        },
        emptyImgur(state) {
            state.imgur = {
                logged_in: false,
                access_token: '',
                account_id: '',
                account_username: '',
                refresh_token: '',
            }
        }
    },
    actions: {
        toggleSidebar(context) {
            context.commit('toggleSidebar')
        }
    },
    plugins: [createPersistedState()],
});

export default store