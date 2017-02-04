<template>
    <section>

        <label class="label">UserName</label>
        <p class="control">
            <input class="input" type="text" name="username" v-model="form.username" placeholder="Text input">
        </p>
        <label class="label">password</label>
        <p class="control">
            <input class="input" v-model="form.password"  type="password" name="password" placeholder="Text input">
        </p>
        <a class="button is-primary" @click="onSubmit">submit</a>

    </section>
</template>

<script>
    import Api from '../store/api'

    export default {
        data () {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            onSubmit () {
                console.log(this.form)
                Api.login(this.form).then(res => {
                    console.log(res)
                }).catch(err => console.log(err))
            }
        }
    }

</script>