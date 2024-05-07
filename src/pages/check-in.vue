<template>
  <div class="wrap">
    <div class="content">
      <div class="content-header flex-between-align">
        <span class="content-header-title fs-20 fw-700 lh-36"
          >Chọn mục tiêu check-in</span
        >
        <div class="content-header-feature flex-align gap-10">
          <div class="select flex-between-align pd-812">
            <div class="flex-align" style="gap: 4px">
              <div class="icon_calendar"></div>
              <div class="fw-500 fs-14 flex-align lh-24">
                Chu kỳ: 3/2023 - 7/2023
              </div>
            </div>
            <img :src="img('arrow-bottom.svg')" alt="" />
          </div>

          <div class="input-search pd-816">
            <div class="icon_search"></div>
            <input class="" type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
      <div class="content-body"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    img(value) {
      return `/images/app-vue/${value}`;
    },
  },
};
</script>

<style lang="scss" scoped>
$url: "/images/check-in/";
.wrap {
  width: calc(100% - 105px);
  height: calc(100% - 70px);
}
.content {
  padding: 45px 160px;
  &-header {
    &-title {
      color: var(--color_text);
    }
  }
}

.icon_search {
  width: 24px;
  height: 24px;
  background: var(--more);
  -webkit-mask-image: url($url + "icon-search.svg");
}
.icon_calendar {
  width: 20px;
  height: 20px;
  background: #1c1b1f;
  -webkit-mask-image: url($url + "calendar.svg");
}
</style>
