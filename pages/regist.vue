<template>
    <section>
        <div class="w-50 pt-5 mx-auto" v-if="!success">
            <b-form @submit.prevent="regist">
                <div :class="{'loading': creatingProcess}">
                    <b-form-group id="input-group-1" label="First Name:">
                        <b-form-input
                                id="input-1"
                                v-model="first_name"
                                type="text"
                                :state="getFieldState('first_name')"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-1" label="Last Name:">
                        <b-form-input
                                id="input-1"
                                v-model="last_name"
                                type="text"
                                :state="getFieldState('last_name')"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-1" label="Email:">
                        <b-form-input
                                id="input-1"
                                v-model="email"
                                type="email"
                                :state="getFieldState('email')"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Password:">
                        <b-form-input
                                id="input-2"
                                v-model="password"
                                :state="getFieldState('password')"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Repeat Password:">
                        <b-form-input
                                id="input-2"
                                v-model="repeat_password"
                                :state="getFieldState('repeat_password')"
                        ></b-form-input>
                    </b-form-group>
                </div>

                <div v-if="creatingProcess" class="text-center">
                    <b-spinner variant="primary" label="Text Centered"></b-spinner>
                </div>
                <b-button v-if="!creatingProcess" class="ml-auto mt-3 d-block" type="submit" variant="primary">Create
                    User
                </b-button>
            </b-form>
        </div>
        <div class="pt-5 w-50 mx-auto" v-if="success">
            <h1 class="text-center">User ({{first_name}} {{last_name}}) was created successfully!</h1>
            <h3 class="text-center">Check your email box ({{email}}) to confirm registration.</h3>

            <b-button class="mx-auto mt-5 d-block" variant="primary" size="lg" @click="finishRegistration">Got it
            </b-button>
        </div>
    </section>
</template>

<script>
    import {required, minLength, email, sameAs} from 'vuelidate/lib/validators';

    export default {
        name: "regist",
        layout: 'frontend',
        data() {
            return {
                wasSubmitted: false,
                creatingProcess: false,
                success: false,
                first_name: '',
                last_name: '',
                password: '',
                repeat_password: '',
                email: '',
            }
        },
        methods: {
            async regist() {
                const userData = _.pick(this, ['first_name', 'last_name', 'password', 'email']);
                this.wasSubmitted = true;

                if (!this.$v.$invalid) {
                    this.creatingProcess = true;
                    this.success = (await this.$axios.post('users/regist', userData)).data.success;
                    this.creatingProcess = false;
                }
            },
            getFieldState(field) {
                const rez = this.$v[field].$invalid;

                if (!this.wasSubmitted) {
                    return null;
                }

                return !rez;
            },
            finishRegistration() {
                this.$router.push('/');
            }
        },
        validations: {
            first_name: {
                required,
                minLength: minLength(3)
            },
            last_name: {
                required,
                minLength: minLength(3)
            },
            password: {
                required,
                minLength: minLength(6)
            },
            repeat_password: {
                required,
                minLength: minLength(6),
                sameAsPassword: sameAs('password')
            },
            email: {
                required,
                email,
                async isUnique(value) {
                    const {success} = (await this.$axios.get('users/is-unique-email/' + value)).data
                    console.log(success);
                    return success;
                }
            }
        }
    }
</script>

<style scoped>
    .loading {
        opacity: .3;
        user-select: none;
        pointer-events: none;
    }
</style>
