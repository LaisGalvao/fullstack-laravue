<template>
  <div>
    <Topbar></Topbar>
    <div class="background">
      <div class="forms">
        <div class="register">
          <b-form ref="formRegister" @submit.stop.prevent="submitRegister">
            <h1>Criar uma conta</h1>
            <b-row>
              <b-col
                v-for="field in fieldsRegister"
                :key="field.key"
                :cols="field.col"
              >
                <!-- Normal fields -->
                <b-form-group
                  v-if="field.type !== 'view'"
                  :id="'input-group-' + field.key"
                  :label="field.label + ' *'"
                  :label-for="'input-' + field.key"
                >
                  <b-form-input
                    v-if="
                      ['text', 'number', 'email', 'password'].includes(
                        field.type
                      )
                    "
                    :id="'input-' + field.key"
                    v-model="formRegister[field.key]"
                    :type="
                      field.type === 'password'
                        ? registerEye
                          ? 'password'
                          : 'text'
                        : field.type
                    "
                    :min="field.min"
                    v-maska="field.mask"
                    :class="field.type === 'password' ? 'input-eye' : ''"
                    required
                  ></b-form-input>

                  <i
                    v-if="field.type === 'password'"
                    @click="registerEye = !registerEye"
                    class="eye material-icons-outlined"
                    >{{ registerEye ? "visibility" : "visibility_off" }}</i
                  >

                  <b-form-select
                    v-if="field.type === 'select'"
                    v-model="formRegister[field.key]"
                    :options="field.options"
                    required
                  >
                    <template #first>
                      <b-form-select-option :value="undefined" disabled
                        >-- Selecione um
                        {{ field.label }} --</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <button type="submit">Entrar (7 dias grátis)</button>
          </b-form>
        </div>
        <div class="login">
          <b-form ref="formLogin" @submit.stop.prevent="submitLogin">
            <h1>Já tenho uma conta</h1>
            <b-row>
              <b-col
                v-for="field in fieldsLogin"
                :key="field.key"
                :cols="field.col"
              >
                <b-form-group
                  v-if="field.type !== 'view'"
                  :id="'input-login-group-' + field.key"
                  :label="field.label + ' *'"
                  :label-for="'input-login-' + field.key"
                >
                  <b-form-input
                    v-if="
                      ['text', 'number', 'email', 'password'].includes(
                        field.type
                      )
                    "
                    :id="'input-login-' + field.key"
                    v-model="formLogin[field.key]"
                    :type="
                      field.type === 'password'
                        ? loginEye
                          ? 'password'
                          : 'text'
                        : field.type
                    "
                    :min="field.min"
                    v-maska="field.mask"
                    :class="field.type === 'password' ? 'input-eye' : ''"
                    required
                  ></b-form-input>

                  <i
                    v-if="field.type === 'password'"
                    @click="loginEye = !loginEye"
                    class="eye material-icons-outlined"
                    >{{ loginEye ? "visibility" : "visibility_off" }}</i
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <button type="submit">Entrar</button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
@import '../style/colors.styl';
@import '../style/mixins.styl';
@import '../style/dimens.styl';

.background {
  gold-background();

  .forms {
    display: flex;
    justify-content: space-between;

    @media (max-width: md) {
      flex-direction: column;
    }

    & > div {
      border-radius: 8px;
      background-color: content-base;
      padding: 4%;

      @media (max-width: md) {
        width: 95% !important;
        margin: 24px auto;
      }

      @media (max-width: sm) {
        width: 100% !important;
        margin: 16px auto;
      }
    }

    h1 {
      color: color-theme(true);
      margin-bottom: 20px;
      font-size: 2.1em;
    }

    button {
      background-color: primary-variant;
      border-radius: 8px;
      border: none;
      color: color-theme();
      width: 50%;
      min-width: 200px;
      padding: 10px 16px;
      margin-top: 12px;
    }

    .register {
      width: 55%;
    }

    .login {
      display: flex;
      align-items: center;
      width: 35%;
    }
  }
}

.form-group {
  position: relative;

  .input-eye {
    padding-right: 2.5rem;
  }

  .eye {
    position: absolute;
    right: 6px;
    bottom: 2px;
    font-size: 32px;
    color: primary;
    cursor: pointer;
    no-select();
  }
}
</style>

<script>
import Topbar from '@/components/Topbar'
import { api } from '@/services'
import { toast } from '@/utils'

export default {
  name: 'Login',
  components: { Topbar },
  data: () => ({
    fieldsRegister: [
      {
        key: 'plan',
        label: 'Plano',
        type: 'select',
        options: [
          { text: 'Site de delivery', value: 'delivery', price: '149' },
          { text: 'Site + APP de delivery', value: 'app', price: '249' },
          { text: 'Loja Online', value: 'loja', price: '299' }
        ],
        col: 6
      },
      {
        key: 'cpf',
        mask: ['###.###.###-##', '##.###.###/####-##'],
        label: 'Documento',
        type: 'text',
        col: 6
      },
      { key: 'name', label: 'Nome', type: 'text', col: 6 },
      { key: 'email', label: 'Email', type: 'email', col: 6 },
      {
        key: 'telephone',
        mask: '(##) #####-####',
        label: 'Telefone',
        type: 'text',
        col: 6
      },
      { key: 'password', label: 'Senha', type: 'password', col: 6 }
    ],
    fieldsLogin: [
      {
        key: 'cpf',
        mask: ['###.###.###-##', '##.###.###/####-##'],
        label: 'Documento',
        type: 'text',
        col: 12
      },
      {
        key: 'group_key',
        label: 'Chave da loja',
        type: 'text',
        col: 12
      },
      { key: 'password', label: 'Senha', type: 'password', col: 12 }
    ],
    formRegister: {},
    formLogin: {},
    loginEye: true,
    registerEye: true
  }),
  mounted () {
    this.formRegister = { plan: this.$route.query.plan || undefined }
  },
  methods: {
    submitRegister () {
      if (!this.$refs.formRegister.checkValidity()) {
        this.$emit('invalid', 'Preencha os campos corretamente')
        return
      }

      // Clone for avoid mutation in formatting
      let f = { ...this.formRegister }

      // Format Plan
      const plan = this.fieldsRegister
        .find((k) => k.key === 'plan')
        .options.find((v) => v.value === f.plan)

      f.plan = { name: plan.text, price: plan.price }

      // Add password confirmation
      f = { ...f, password_confirmation: f.password }

      // Add type
      f.type = 'commerce'

      // temp
      f.key = 'loja_vinicius33'
      f.description = 'temporário'

      // Submit
      api.post('register/store', f).then(
        (response) => {
          console.log(response)
          // {"headers":{},"original":{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NDhmZDVlYS0xZDA4LTRjMjYtYjE3Yy1lZGE2N2YzYmVlOWYiLCJqdGkiOiJlNDk5YWJkY2ZiNWRjZDBlMmE3NjJkZTIxYzQ0MzEzYmVhN2Q4OWY0MmZlMzc5MTFkYmQzNDhhMGRlMTUyMjIyZmEwMTFiOWRlN2EzMDJjOSIsImlhdCI6MTYzNjU3MjI1Ni44MjYzNjksIm5iZiI6MTYzNjU3MjI1Ni44MjYzNzQsImV4cCI6MTY2ODEwODI1Ni44MTc3MTMsInN1YiI6ImFjNWVlY2Y4LTQ0OGQtNDc3MC1hZjI3LWE2Y2JmOWMxMzIyNiIsInNjb3BlcyI6W119.ATvAWYQRH_9Xs1n4ZC_TeRpDkF7b2JJcfaOYmryVsR_-J0HpL-7ub69sK39NqpQCVMBPsCfY_1WGVHEVQ85T9OXyYUWuSNb2Ui7Bm65NDdK5GwVIwAuWoyDbwKxjwomHdYKIignGiwI4dEUTuqICdk56x_2DYU7iuWZWYFyu0UXbXmFQUyUFSywntHO0T1Q141LWDItl6RiJJtvsH6J7vJCRpDI59m0WJsrPz-mZ4F7lU65W-lSkya0TiCT46xN6OElGi51TtNBOnAEEyxgKcxeMfaXtcQWeioafG6tGsKjSr2u1iwlWYvlm6n781MyIAZIy7OLO_NEna3TbhLxK-45Z74oCUW_GSFN1OtV69DnnShGjT5pG1fZ3_njEcCrU9_SAJRArvgdI4urafgM2fh3-oYACrS8M9b9XVMuOJwpm9hdvMMLhVhkPMEn8T-4NX_hahir6dxlsXuVz3r3pGbS0ob2s_Ny9cy8go1gndEWRd2qQeKf6lkRB-m7qwzdY9ZMSi1znZGF4vS9hgl_k7sDRQViXWK1aggRRNI8uqrr7h_cQ6__2GaeCNB5wg1CyvrqdPHnVMpAUasVCDc2BRJAmoUKlvTgkOw0hu2JTQXqq-aGXMcZV8gND0s9JBMv1gOjh9dS-0aRdEdCngcNQY7q2lqd_DGHZkcMafWs3gjo","user":{"cpf":"555.555.555-55","name":"teste","email":"teste@teste.com","telephone":"(47) 33027-3620","id":"ac5eecf8-448d-4770-af27-a6cbf9c13226","updated_at":"2021-11-10T19:24:13.000000Z","created_at":"2021-11-10T19:24:13.000000Z","groups":[{"id":"1eec8970-9a35-44fb-9102-95d38c789829","key":"loja_vinicius33","type":"commerce","description":"tempor\u00e1rio","master_group_id":"d0a2a79f-54ea-4c5c-9898-c3aea49a3b1e","created_at":"2021-11-10T19:24:13.000000Z","updated_at":"2021-11-10T19:24:13.000000Z","deleted_at":null,"public":0,"pivot":{"user_id":"ac5eecf8-448d-4770-af27-a6cbf9c13226","group_id":"1eec8970-9a35-44fb-9102-95d38c789829","created_at":"2021-11-10T19:24:13.000000Z","updated_at":"2021-11-10T19:24:13.000000Z"},"extra_fields":[]}]}},"exception":null}
          this.$store.dispatch('login', response.data)
          this.$router.replace({ path: '/' })
        },
        (error) => {
          toast(this, 'danger', 'Registro inválido', error.message)
          return Promise.reject(error)
        }
      )
    },
    submitLogin () {
      if (!this.$refs.formLogin.checkValidity()) {
        this.$emit('invalid', 'Preencha os campos corretamente')
        return
      }

      console.log(this.formLogin)
      api.post('login', this.formLogin).then(
        (response) => {
          // cpf: "555.555.555-55"
          // password: "5555555555555555555"
          this.$store.dispatch('login', response.data)
          this.$router.replace({ path: '/' })
        },
        (error) => {
          toast(this, 'danger', 'Login inválido', error.message)
          return Promise.reject(error)
        }
      )
    }
  }
}
</script>
