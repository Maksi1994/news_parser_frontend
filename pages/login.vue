<template>
    <div class="w-50 pt-5 mx-auto">
        <b-form @submit.prevent="onLogin">
            <b-form-group id="input-group-1" label="Email:">
                <b-form-input
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        :state="getFieldState('email')"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Password:">
                <b-form-input
                        id="input-2"
                        v-model="form.password"
                        :state="getFieldState('password')"
                ></b-form-input>
            </b-form-group>

            <b-form-checkbox
                    class="remember_me"
                    id="checkbox-1"
                    v-model="form.remember_me"
                    value="1"
                    unchecked-value="0">
               Remember Me
            </b-form-checkbox>

            <b-button class="ml-auto mt-3 d-block" type="submit" variant="primary">Login</b-button>
        </b-form>
    </div>
</template>

<script>
    import {required, minLength, email} from 'vuelidate/lib/validators'
    import {mapActions} from 'vuex';

    export default {
        layout: 'frontend',
        name: "login",
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                    remember_me: false
                },
                wasSubmitted: false
            }
        },
        methods: {
            ...mapActions('users', ['login']),
            async onLogin() {
                this.wasSubmitted = true;

                if (!this.$v.$invalid) {
                    const rez = await this.login(this.form);

                    if (rez) {
                        this.$router.push('/');
                    }
                }
            },
            getFieldState(field) {
                if (!this.wasSubmitted) {
                    return null;
                }

                return !this.$v.form[field].$invalid;
            }
        },
        validations: {
            form: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6)
                }
            }
        }
    }
</script>

<style scoped>
    .remember_me {
        user-select: none;
    }
</style>
