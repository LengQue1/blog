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
    import md5 from 'md5'

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
                this.form.password = md5(this.form.password);
                console.log(this.form);
                Api.login(this.form).then(res => {
                    if (res.data.status == 'success') {
                        sessionStorage.setItem('token', res.data.token)
                      console.log('登录成功!');
                      this.$router.push({path: '/'})
                    } else if (res.data.status === 'fail'){
                      console.log('登陆失败，请检查帐号与密码');
                      sessionStorage.removeItem('token');
                    }
                }).catch(err => console.log(err))
            }
        }
    }

</script>
