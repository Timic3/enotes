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
          :loading="loading"
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="loginRequest"
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
          label="Username"
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
        ></v-checkbox>
        
        <vue-recaptcha
          ref="recaptcha"
          sitekey="6LeecOcZAAAAAJHGwAr2odgqZesq0Bu5hOiPCMLr"
          :loadRecaptchaScript="true"
          @verify="verifyCaptcha"
          @expired="expiredCaptcha"
          class="mb-7"
        ></vue-recaptcha>

        <v-btn
          :loading="loading"
          :disabled="!valid || !captchaToken"
          color="success"
          class="mr-4"
          @click="registerRequest"
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
    <v-col 
      md="6"
      offset-md="3"
    >
      <v-alert
        dense
        text
        type="success"
        v-if="isSuccessVisible"
      >
        {{ successText }}
      </v-alert>

      <v-alert
        dense
        text
        type="error"
        v-if="isErrorVisible"
      >
        {{ errorText }}
      </v-alert>
    </v-col >
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import axios from 'axios';

export default {
  components: { VueRecaptcha },

  data: () => ({
    login: true,
    valid: false,
    loading: false,
    captchaToken: false,
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

    isSuccessVisible: false,
    successText: '',
    isErrorVisible: false,
    errorText: '',
  }),

  computed: {
    passwordConfirmationRule() {
      return () => (this.passwordReg === this.confirmpassword) || 'Password must match';
    },
    loggedIn() {
      return this.$store.state.status.loggedIn;
    }
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    change() {
      this.login = !this.login;
    },
    async registerRequest() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          if (this.captchaToken) {
            const response = await this.$store.dispatch('register', {
              username: this.usernameReg,
              email: this.email,
              password: this.passwordReg,
              captcha: this.captchaToken
            });
            if (response.success) {
              this.notifySuccess(response.message);
              this.login = true;
            } else {
              this.notifyError(response.message);
              this.$refs.recaptcha.reset();
            }
          } else {
            this.notifyError('Captcha verification failed!');
            this.$refs.recaptcha.reset();
            console.error('Captcha verification failed!');
          }
          this.loading = false;
        } catch (e) {
          this.notifyError(e.message);
          this.$refs.recaptcha.reset();
          this.loading = false;
        }
      }
    },
    async loginRequest() {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          const response = await this.$store.dispatch('login', {
            username: this.username,
            password: this.password
          });
          if (response.success) {
            this.notifySuccess(response.message);
            this.$router.push('/');
          } else {
            this.notifyError(response.message);
          }
          this.loading = false;
        } catch (e) {
          this.notifyError(e.message);
          this.loading = false;
        }
      }
    },
    verifyCaptcha(token) {
      this.captchaToken = token;
    },
    expiredCaptcha() {
      this.captchaToken = false;
    },
    notifySuccess(message) {
      this.isSuccessVisible = true;
      this.isErrorVisible = false;
      this.successText = message;
    },
    notifyError(message) {
      this.isSuccessVisible = false;
      this.isErrorVisible = true;
      this.errorText = message;
    }
  },

  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  }
}
</script>