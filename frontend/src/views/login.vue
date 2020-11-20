<template>
  <div>
    <v-card class="mx-auto mt-6 pa-6" max-width="500" v-if="login == true">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="username"
          :counter="10"
          :rules="nameRules"
          label="Userame"
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
        lazy-validation
      >
        <v-text-field
          v-model="usernameReg"
          :counter="10"
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
          hint="At least 8 characters"
          counter
          class="mb-3"
        ></v-text-field>

        <v-text-field
          v-model="confirmpassword"
          :rules="[rules.required, rules.min, passwordConfirmationRule]"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="Confirm password"
          hint="At least 8 characters"
          counter
          class="mb-3"
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
    valid: true,
    username: '',
    password: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],

    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    checkbox: false,

    show: false,
    usernameReg: '',
    passwordReg: '',
    confirmpassword: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
    },
  }),

  computed: {
    passwordConfirmationRule() {
      return () => (this.password === this.confirmpassword) || 'Password must match'
    }
  },

  methods: {
    validate () {
      this.$refs.form.validate()
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