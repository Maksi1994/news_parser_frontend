<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <logo class="mr-5"></logo>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item class="mr-3" to="/headline">News</b-nav-item>
                    <b-nav-item class="mr-3" to="/ratings">Ratings</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown right v-if="isAuth">
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item to="/profile">Profile</b-dropdown-item>
                        <b-dropdown-item to="/profile">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-navbar-nav right v-if="isAuth">
                        <b-nav-item class="mr-3" @click="logout">Logout</b-nav-item>
                    </b-navbar-nav>
                    <template v-else>
                        <b-navbar-nav>
                            <b-nav-item class="mr-3" to="/login">Login</b-nav-item>
                            <b-nav-item class="mr-3" to="/regist">Registrate User</b-nav-item>
                        </b-navbar-nav>
                    </template>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "frontend-header",
        computed: {
            ...mapGetters('users', ['isAuth'])
        },
        methods: {
            ...mapActions('users', ['logout'])
        }
    }
</script>

<style scoped>

</style>
