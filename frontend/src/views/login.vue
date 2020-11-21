<template>
  <div>
    <v-card class="mx-auto mt-6 pa-6" max-width="500" v-if="login == true">
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-text-field
          v-model="username"
          :counter="10"
          :rules="nameRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show = !show"
          class="mb-3"
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
          to="Main"
        >
          Login
        </v-btn>

        <v-btn
          color="success"
          class="mr-4"
          @click="change"
        >
          Register
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>
      </v-form>
    </v-card>
    <v-card class="mx-auto mt-6 pa-6" max-width="500" v-else>
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-text-field
          v-model="usernameReg"
          :counter="20"
          :rules="nameRules"
          label="Userame"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="passwordReg"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          counter
          class="mb-3"
          required
        ></v-text-field>

        <v-text-field
          v-model="confirmpassword"
          :rules="[rules.required, rules.min, passwordConfirmationRule]"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="Confirm password"
          counter
          class="mb-3"
          required
        ></v-text-field>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree to our terms?"
          required
          class="mb-3"
        ></v-checkbox>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Confirm
        </v-btn>

        <v-btn
          color="success"
          class="mr-4"
          @click="change"
        >
          Back
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    login: true,
    valid: false,
    username: '',
    password: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20 && v.length > 3) || 'Username length can only be between 3 and 20!',
    ],

    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => (v && v.length <= 256 && v.length > 5) || 'Email length can only be between 5 and 256!',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    checkbox: false,

    show: false,
    usernameReg: '',
    passwordReg: '',
    confirmpassword: '',
    rules: {
      required: value => !!value || 'Password is required.',
      min: v => v.length >= 8 && v.length < 125 || 'Password length can only be between 8 and 125!',
    },
  }),

  computed: {
    passwordConfirmationRule() {
      return () => (this.passwordReg === this.confirmpassword) || 'Password must match'
    },
  },

  methods: {
    validate () {
      //this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    change (){
      this.login = !this.login;
    },
  },
}
</script>