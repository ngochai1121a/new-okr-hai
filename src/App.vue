<template>
    <div class="wrapper">
        <div class="header flex-between-align">
            <div class="flex-align gap-15">
                <div class="header-name_software flex-align gap-15">
                    <img :src="img('logo-smit-okr.svg')" alt="" />
                    <img :src="img('name-logo.svg')" alt="" />
                </div>
                <div class="solit"></div>
                <div @click="hideDropdown('dropdown_switch')" class="posi-relative popup-class">
                    <div class="header-switch flex-between-align gap_4">
                        <div class="flex-align gap_4">
                            <img :src="img('people.svg')" alt="" />
                            <span class="header-switch-name fw-500 fs-14 lh-20">Cá nhân</span>
                        </div>
                        <img :src="img('arrow-black.svg')" alt="" />
                    </div>
                    <div @click.stop v-if="dropdown_switch" class="dropdown posi-absolute flex-column gap-8 pd-10">
                        <div v-for="(item, index) in list_switch" :key="index" class="dropdown-item flex-align pd-710 gap_4">
                            <img :src="img(item.icon)" alt="" />
                            <div class="fw-500 fs-14 lh-20">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-user flex-align gap-20">
                <div class="header-user-people flex-align gap-10">
                    <img class="header-user-people-avatar" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />
                    <div class="header-user-people-name font-14-400">X’eriya Ponald</div>
                </div>
                <img :src="img('arrow-bottom.svg')" alt="" />
            </div>
        </div>
        <div class="navbar">
            <div class="navbar-items">
                <!-- :class="{ router-link-active: $route.path.startsWith('/') }" -->
                <router-link to="/">
                    <div class="navbar-items-item flex-column-align">
                        <div class="navbar-items-item-icon active">
                            <div class="icon-okrs"></div>
                        </div>
                        <div class="navbar-items-item-name">OKRs</div>
                    </div>
                </router-link>

                <router-link to="/check-in">
                    <div class="navbar-items-item flex-column-align">
                        <div class="navbar-items-item-icon active">
                            <div class="icon-checkin"></div>
                        </div>
                        <div class="navbar-items-item-name">Check-in</div>
                    </div>
                </router-link>

                <router-link to="/cong-viec">
                    <div class="navbar-items-item flex-column-align">
                        <div class="navbar-items-item-icon active">
                            <div class="icon-job"></div>
                        </div>
                        <div class="navbar-items-item-name">Công việc</div>
                    </div>
                </router-link>

                <router-link to="/phan-hoi">
                    <div class="navbar-items-item flex-column-align">
                        <div class="navbar-items-item-icon active">
                            <div class="icon-feedback"></div>
                        </div>
                        <div class="navbar-items-item-name">Phản hồi</div>
                    </div>
                </router-link>
            </div>

            <div class="navbar-items-item flex-column-align" style="border: 0px solid #d9e4ff">
                <div class="navbar-items-item-icon">
                    <div class="icon-setting"></div>
                </div>
                <div class="navbar-items-item-name">Cài đặt</div>
            </div>
        </div>

        <div class="content">
            <div class="content-scron">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dropdown: {},
            dropdown_switch: false,

            list_switch: [
                {
                    name: 'Cá nhân',
                    icon: 'people.svg'
                },
                {
                    name: 'Tổ chức',
                    icon: 'apartment.svg'
                }
            ]
        }
    },

    methods: {
        img(value) {
            return `/images/app-vue/${value}`
        },
        hideDropdown(data) {
            this[data] = !this[data]
            console.log(this[data])
            const closeFunction = event => {
                if (!event.target.closest('.popup-class')) {
                    this[data] = false

                    window.removeEventListener('click', closeFunction)
                }
            }
            window.addEventListener('click', closeFunction)
        }
    }
}
</script>

<style lang="scss">
$url: '/images/app-vue/';

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --gradient: linear-gradient(167deg, #17e180 -19.24%, #009883 125.35%);
}
:root {
    --back: #000000;
}
:root {
    --color_text: #131523;
}
:root {
    --more: #5a607f;
}
:root {
    --hover: #f5f6fa;
}
$mt: 70px;

.wrapper {
    width: 100vw;
    height: 100vh;
    background: #fff;
}
.input-search {
    border-radius: 12px;
    background: #fff;
    display: flex;
    align-items: center;
    gap: 6px;
    width: 250px;
    height: 40px;
    input {
        border: none;
        outline: none;
        width: 100%;
    }
}
.people {
    padding: 3px 5px;
    border-radius: 25px;
    background: var(--gradient);
    &-withme {
        padding: 3px 5px;
        border-radius: 25px;
        &:hover {
            cursor: pointer;
            background: #f5f6fa;
        }
    }
    &-member {
        padding: 3px 5px;
        border-radius: 25px;
        background: var(--gradient);
        &:hover {
            opacity: 0.7;
            cursor: pointer;
        }
    }
    &-avatar {
        height: 14px;
        width: 14px;
        border-radius: 50px;
    }
    &-name {
        color: #fff;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 12px;
    }
    &-set {
        color: var(--color_text);
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 12px;
    }
}
.select {
    border-radius: 12px;
    background: #fff;
    height: 40px;
    cursor: pointer;

    &:hover {
        .icon_calendar {
            background: var(--gradient);
        }
    }
}
.fs {
    &-12 {
        font-size: 12px;
    }
    &-14 {
        font-size: 14px;
    }
    &-16 {
        font-size: 16px;
    }
    &-20 {
        font-size: 20px;
    }
}
.lh {
    &-36 {
        line-height: 36px;
    }
    &-24 {
        line-height: 24px;
    }
    &-20 {
        line-height: 20px;
    }
    &-26 {
        line-height: 26px;
    }
    &-14 {
        line-height: 14px;
    }
    &-28 {
        line-height: 28px;
    }
}
.fw {
    &-400 {
        font-weight: 400;
    }
    &-500 {
        font-weight: 500;
    }
    &-700 {
        font-weight: 700;
    }
}
.mg_b {
    &-8 {
        margin-bottom: 8px;
    }
}
.mg_l {
    &-4 {
        margin-left: 4px;
    }
}
.pd {
    &-8 {
        padding: 8px;
    }
    &-816 {
        padding: 8px 16px;
    }
    &-10 {
        padding: 10px;
    }
    &-812 {
        padding: 8px 12px;
    }
    &-810 {
        padding: 8px 10px;
    }
    &-710 {
        padding: 7px 10px;
    }
    &-58 {
        padding: 5px 8px;
    }
    &-1013 {
        padding: 10px 13px;
    }
    &-1025 {
        padding: 10px 20px;
    }
    &-2535 {
        padding: 25px 35px;
    }
    &-2023 {
        padding: 20px 23px;
    }
}
.brr {
    &-12 {
        border-radius: 12px;
    }
}
.gap {
    &_4 {
        gap: 4px;
    }
    &-8 {
        gap: 8px;
    }
    &-10 {
        gap: 10px;
    }
    &-15 {
        gap: 15px;
    }
    &-20 {
        gap: 20px;
    }
    &-25 {
        gap: 25px;
    }
    &-30 {
        gap: 30px;
    }
}

.br {
    &-12 {
        border-radius: 12px;
    }
}

// ảnh
.imge {
    &-20 {
        border-radius: 50%;
        width: 20px;
        height: 20px;
    }
}

.posi-relative {
    position: relative;
}
.posi-absolute {
    position: absolute;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $mt;
    padding: 20px 30px;
    z-index: 1;
    &-switch {
        padding: 4px 5px;
        border-radius: 18px;
        border: 1px solid rgba(177, 181, 200, 0.36);
        width: 130px;
        cursor: pointer;
        &-name {
            color: var(--color_text);
        }
    }
    &-user {
        &-people {
            &-avatar {
                width: 39px;
                height: 39px;
                flex-shrink: 0;
                border-radius: 50px;
            }
            &-name {
                color: var(--more);
                line-height: 20px;
                font-style: normal;
            }
        }
    }
}
.dropdown {
    background: white;
    gap: 10px;
    width: 100%;
    top: calc(100% + 10px);
    left: 0px;
    text-align: start;
    border-radius: 12px;
    border: 1px solid rgba(177, 181, 200, 0.36);
    z-index: 1;

    &-item {
        border-radius: 9px;
        &:hover {
            background: #f5f6fa;
            cursor: pointer;
        }
    }
    &.everybody {
        padding: 3px;
        width: 230px;
    }
    &.header_cycle {
        padding: 3px;
        width: 274px;
        z-index: 1;
        cursor: auto;
    }
    &.target_type {
        padding: 10px 13px;
        width: 230px;
        z-index: 1;
        &-items {
            padding: 7px 10px;
            border: 0px solid;
            border-radius: 12px;
            gap: 4px;
            &:hover {
                background: #f5f6fa;
            }
        }
    }
}

.navbar {
    position: fixed;
    top: $mt;
    left: 0;
    bottom: 0;
    width: 105px;
    &-items {
        border-bottom: 1px solid #d9e4ff;
        &-item {
            gap: 4px;
            padding: 20px 10px;
            width: 105px;
            border-top: 1px solid #d9e4ff;
            cursor: pointer;
            &:hover {
                background: #f8fcfb;
            }
            .icon-okrs {
                width: 28px;
                height: 28px;
                background: var(--more);
                -webkit-mask-image: url($url + 'icon-okrs.svg');
            }
            .icon-checkin {
                width: 28px;
                height: 28px;
                background: var(--more);
                -webkit-mask-image: url($url + 'icon-check-in.svg');
            }
            .icon-job {
                width: 28px;
                height: 28px;
                background: var(--more);
                -webkit-mask-image: url($url + 'icon-job.svg');
            }
            .icon-feedback {
                width: 28px;
                height: 28px;
                background: var(--more);
                -webkit-mask-image: url($url + 'icon-feedback.svg');
            }
            .icon-setting {
                width: 28px;
                height: 28px;
                background: var(--more);
                -webkit-mask-image: url($url + 'icon-setting.svg');
            }
            &-icon {
                padding: 8px;
                border-radius: 12px;
            }
            &-name {
                color: #5a607f;
                text-align: center;
                font-size: 12px;
                font-style: normal;
                font-weight: 600;
                line-height: 17px;
                text-decoration: none;
            }
        }
    }
}

.router-link-active {
    .active {
        background: var(--gradient);
        animation: test 0.5s;
    }
    @keyframes test {
        from {
            opacity: 0;
            scale: 0.5;
        }
        to {
            opacity: 1;
            scale: 1;
        }
    }
    .icon-okrs {
        background: white;
    }
    .icon-checkin {
        background: white;
    }
    .icon-feedback {
        background: white;
    }
    .icon-job {
        background: white;
    }
    .navbar-items-item {
        background: #e6f8f3;
    }
}

.content {
    position: fixed;
    left: 105px;
    top: $mt;
    width: calc(100vw - 105px);
    height: calc(100vh - $mt);
    background-image: url($url + 'background-gradient.png');
    background-size: cover;
    background-repeat: no-repeat;
    border-top-left-radius: 30px;
    &-scron {
        height: 100%;
        overflow: auto;
    }
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(240, 244, 249, 0.9);
        border-top-left-radius: 29px;
        z-index: -1;
    }
}
.solit {
    height: 15px;
    width: 1px;
    background-color: rgba(177, 181, 200, 0.36);
}
.dashed {
    height: 1px;
    width: 55px;
    border: 1px dashed #d7dbec;
}
.search {
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    border: 1px solid #d9e4ff;
    &.member {
        padding: 7px 10px;
        &:hover {
            background: #f5f6fa;
            cursor: pointer;
        }
        &.bgr {
            background: #f5f6fa;
        }
    }

    &.avatar {
        border-radius: 20px;
        border: 1px solid #fff;
        width: 20px;
        height: 20px;
    }
}
// .search-input {
//   padding: ;
// }
.button {
    &-starting_value {
        width: 50%;
    }
    &.conttent {
        padding: 15px 25px;
        border-radius: 12px;
        border: 1px solid #d7dbec;
        height: 70px;
        justify-content: center;
    }
    &.next {
        background: var(--gradient);
        color: #fff;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        &:hover {
            opacity: 0.8;
            cursor: pointer;
        }
    }
    &.cancel {
        color: #131523;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 14px;
        &:hover {
            background: var(--hover);
            cursor: pointer;
        }
    }
}
.hover {
    padding: 2px 5px;
    &:hover {
        cursor: pointer;
        background: #f5f6fa;
        border-radius: 8px;
    }
}

.select_KR {
    &-color {
        border: 1px solid #17e180;
        border-radius: 22px;
        background: var(--gradient);
        padding: 3px 10px;
        width: 38px;
    }
}
.ellipse {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--gradient);
    border: 1px solid #fff;
    left: -4px;
    top: 12px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
.opacity {
    &:hover {
        opacity: 0.7;
    }
}
</style>
