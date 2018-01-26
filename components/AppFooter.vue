<template>
  <footer role="contentinfo" class="footer">
    <header>
      <h2>ご意見、ご感想</h2>
    </header>

    <div class="feedback">
      <div class="links">
        <FeedbackTweet
          :url="href"
          class="button"
        ><icon name="twitter" scale="1.1"></icon> リンクをツイート</FeedbackTweet>
        <FeedbackForm
          :entryTitle="href"
          class="button"
        ><icon name="pencil-square-o" scale="1.1"></icon>お便りを送る</FeedbackForm>
      </div>
      <div class="timeline">
        <TwitterTimeline
          :widgetId="'956788689086046208'"
          :q="'#soussune'"
          :rt="false"
        />
      </div>
    </div>
  </footer>
</template>

<script>
import TwitterTimeline from '~/components/TwitterTimeline.vue'
import FeedbackForm from '~/components/FeedbackForm.vue'
import FeedbackTweet from '~/components/FeedbackTweet.vue'

export default {
  components: {
    FeedbackTweet,
    FeedbackForm,
    TwitterTimeline
  },
  computed: {
    tweetUrl() {
      return location.href
    }
  },
  data() {
    return {
      href: ''
    }
  },
  methods: {
    updateHref() {
      this.href = location.href
    }
  },
  mounted() {
    this.updateHref()
  },
  watch: {
    $route: function() {
      this.updateHref()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';
@import '~assets/css/_vars.scss';

.footer {
  margin-top: 40px;
  padding: 2rem 1rem 120px;
  background: $clr-main;
  color: $clr-white;

  display: grid;
  justify-items: center;
  grid-gap: 20px;
}
.feedback {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;
  grid-row-gap: 40px;
  align-items: start;

  @include mq() {
    grid-template-columns: auto;
    .timeline {
      order: 3 !important;
    }
  }
  .links {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    order: 2;
  }
  .timeline {
    order: 1;
  }

  .button {
    background: $clr-white-ll;
    font-weight: 400;
    font-size: 1.1rem;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    margin: 0;
    padding: 0.7rem 1.6rem;
    border-radius: 1.5rem;
    line-height: 1;
    color: $clr-black-d;
    text-align: center;
    cursor: pointer;
    user-select: none;
    text-decoration: none;

    svg {
      margin-right: 0.4rem;
    }
  }
}
</style>
