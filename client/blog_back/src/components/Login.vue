<template>
    <section>
        <div class="container">
          <h1>欢迎登录</h1>
          <label class="label">UserName</label>
          <p class="control">
            <input class="input" type="text" name="username" v-model="form.username" placeholder="Text input">
          </p>
          <label class="label">password</label>
          <p class="control">
            <input class="input" v-model="form.password"  type="password" name="password" placeholder="Text input">
          </p>
          <a class="button is-primary" @click="onSubmit">submit</a>
        </div>

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
                let formObj = {
                  username: this.form.username,
                  password: md5(this.form.password)
                };
                Api.login(formObj).then(res => {
                    if (res.data.status == 'success') {
                        sessionStorage.setItem('token', res.data.token);
                        sessionStorage.setItem('username', this.form.username);
                        this.$message({
                          type: 'success',
                          message: '登录成功'
                        });
                        this.$store.dispatch('FETCH_USER', {
                            model: 'users',
                            params: {
                              attributes: { exclude: ['password']}
                            },
                            username: this.form.username
                        }).then(() => {
                          this.$router.push({path: '/'});
                        });
                        this.$store.state.app.device.isLogin = true;

                    } else if (res.data.status === 'fail') {
                      this.$message({
                        type: 'error',
                        message: '登陆失败，请检查帐号与密码'
                      });
                      sessionStorage.removeItem('token');
                    }
                }).catch(err => console.log(err));
            }
        }
    }

</script>
