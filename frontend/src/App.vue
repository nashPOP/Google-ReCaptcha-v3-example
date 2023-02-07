<template>
  <label for="wallet">Wallet</label>
  <input v-model="wallet" type="text" name="" id="" />
  <button @click="recaptcha">submit</button>
</template>

<script>
import { ref } from "vue";
import { useReCaptcha } from "vue-recaptcha-v3";
import axios from "axios";

export default {
  name: "App",
  setup() {
    const wallet = ref("");
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

    const recaptcha = async () => {
      // (optional) Wait until recaptcha has been loaded.
      await recaptchaLoaded();

      // Execute reCAPTCHA with action "login".
      const token = await executeRecaptcha("login");

      // Do stuff with the received token.
      console.log({ token });
      const backend = axios.create({
        baseURL: "http://127.0.0.1:3000",
      });
      backend.post("/faucet", {
        "g-recaptcha-response": token,
        wallet: wallet.value,
      });
    };

    return {
      recaptcha,
      wallet,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
