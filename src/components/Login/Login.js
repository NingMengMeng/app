import { Input } from 'ELUI/input';
import { CellGroup, CellItem } from 'ELUI/cell';
import { Button } from 'ELUI/button'

export default {
    data() {
        return {
            user: '',
            pass: ''
        }
    },
    components: {
        'vue-input': Input,
        'vue-cell-group': CellGroup,
        'vue-cell-item': CellItem,
        'vue-button': Button
    },
    methods: {
        commitToLogin() {
            this.$store.dispatch('goLogin', { password: this.pass, userId: this.user }).then(data => {
                this.$router.push('/content/schedule')
            })
        }
    },
    mounted() {
        console.log(this)
        console.log(this.$router)
    }
}