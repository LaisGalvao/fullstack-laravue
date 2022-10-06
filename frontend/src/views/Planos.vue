<template>
    <div>
        <Topbar btnLabel="Entrar" @button="toLogin"></Topbar>
        <div class="background">
            <span class="plano-title">Escolha um plano</span>
            <span class="plano-text">Disponibilizamos esses planos para você ter sua loja virtual hoje mesmo:</span>
            <span class="plano-text">• Preparamos uma loja virtual para você e integramos com seu negócio, tudo seguindo a identidade da marca, uma solução única para cada cliente.</span>
            <span class="plano-text">• Nossas soluções contam com o que é de mais novo em tecnologia, tudo o que você precisa para consolidar seus clientes, aumentar suas vendas, e atingir novos públicos.</span>
            <div class="planos">
                <div>
                    <span class="plano-card-title">Site de delivery</span>
                    <span class="plano-card-text">Sem App (pode ser solicitado posteriormente)</span>
                    <span class="plano-card-text">Todas funcionalidade abaixo</span>
                    <span class="plano-card-text">R$ 99/mês nos 3 primeiro meses. Apos R$ 149/mês</span>
                    <span class="plano-card-text">Se optar por configurar os site: taxa unica de R$ 199</span>
                    <span class="plano-card-text">Se optar por criar identidade e configurar os site: taxa unica de R$ 499</span>
                    <span class="plano-card-price">R$ 149</span>
                    <span class="plano-card-price-info">por mês</span>
                    <div class="plano-btn" @click="toLogin('delivery')">7 dias grátis</div>
                </div>
                <div>
                    <span class="plano-card-title">Site + APP de delivery</span>
                    <span class="plano-card-text">App Personalizado para Iphone e Android</span>
                    <span class="plano-card-text">Todas funcionalidade abaixo</span>
                    <span class="plano-card-text">R$ 99/mês nos 3 primeiro meses. Apos R$ 249/mês</span>
                    <span class="plano-card-text">Se optar por configurar os site: taxa unica de R$ 199</span>
                    <span class="plano-card-text">Se optar por criar identidade e configurar os site: taxa unica de R$ 499</span>
                    <span class="plano-card-price">R$ 249</span>
                    <span class="plano-card-price-info">por mês</span>
                    <div class="plano-btn" @click="toLogin('app')">7 dias grátis</div>
                </div>
                <div>
                    <span class="plano-card-title">Loja online</span>
                    <span class="plano-card-text">App Personalizado para Iphone e Android</span>
                    <span class="plano-card-text">Todas funcionalidade abaixo</span>
                    <span class="plano-card-text">R$ 99/mês nos 3 primeiro meses. Apos R$ 299/mês</span>
                    <span class="plano-card-text">Se optar por configurar os site: taxa unica de R$ 199</span>
                    <span class="plano-card-text">Se optar por criar identidade e configurar os site: taxa unica de R$ 499</span>
                    <span class="plano-card-price">R$ 299</span>
                    <span class="plano-card-price-info">por mês</span>
                    <div class="plano-btn" @click="toLogin('loja')">7 dias grátis</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="stylus">

    @import '../style/colors.styl';
    @import '../style/mixins.styl';
    @import '../style/dimens.styl';

    .background
        gold-background()

        .plano-title
        .plano-text
            text-align justify
            display block

        .plano-title
            color primary
            font-size 2em
            margin-bottom 15px

        .plano-text
            color color-theme()
            margin-bottom 10px

    .planos
        display flex
        justify-content space-between

        @media (max-width: lg)
            flex-direction column

        & > div
            background-color content-base
            padding 0 (10% / 3)

            @media (max-width: lg)
                margin 12px 0 !important

            &:nth-child(2n)
                margin 0 4%

            span
                display block

            .plano-card-title
                color primary
                font-size 1.5em
                margin 40px 0 10px

            .plano-card-text
                color info
                text-align justify
                font-size 1.2em
                border-bottom 1px solid primary
                padding 10px 0

            .plano-card-price
                color primary-variant
                font-size 2em
                margin-top 32px

            .plano-card-price-info
                color info

            .plano-btn
                width 50%
                min-width 140px
                padding 12px 16px
                margin 40px auto 30px
                display block
                border-radius: 32px
                color color-theme()
                background-color primary-variant
                cursor pointer
                border 1px solid primary-variant
                transition .3s ease-in-out

                &:hover
                    background-color: color-theme();
                    color: #313131;
                    border-color: #d2d2d8;

</style>

<script>
import Topbar from '@/components/Topbar'

export default {
  name: 'Planos',
  components: { Topbar },
  methods: {
    toLogin (plan) {
      this.$router.push({ name: 'Login', query: { plan } })
    }
  }
}
</script>
