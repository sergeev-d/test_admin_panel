<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Rivkat's Monitoring Tool</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="Login"
                                            name="login"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            v-model="user"
                                            @blur="$v.user.$touch()"
                                    ></v-text-field>

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            v-model="password"
                                            @blur="$v.password.$touch()"
                                    ></v-text-field>
<!--                                    <div class="invalid-feedback" v-if="!$v.password.required">Password field is required</div>-->
                                    <div class="invalid-feedback" v-if="!$v.password.minLength">
                                        Password field should be more than {{ $v.password.$params.minLength.min }}, now is {{ password.length }}
                                    </div>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="onSubmit(user, password)">Log In</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import { required, minLength } from 'vuelidate/lib/validators';
    import { LOGIN } from "../store/actions.type";

    export default {
        data () {
            return {
                user : '',
                password : ''
            }
        },
        methods: {
            onSubmit (user, password) {
                this.$store.dispatch(LOGIN, { user, password } )
                    .then(() => this.$router.push({ name: 'main' }))
            }
        },
        validations: {
            user: {
                required
            },
            password: {
                required,
                minLength: minLength(6)
            }
        }
    }
</script>