<template>
    <Teleport to="body">
        <!-- popup xóa mục tiêu  -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width: 420px; height: 165px">
                <div class="modal-content popup_time flex-column-between">
                    <div class="popup_time-content flex-column gap_4">
                        <div class="flex-align gap_4">
                            <img :src="img('delete.svg')" alt="" />
                            <span class="fs-14 fw-700 lh-28">Xóa OKRs</span>
                        </div>
                        <span class="fs-14 fw-400 lh-20" style="color: #718096"> Bạn có chắc chắn xóa mục tiêu này không, khi đã xóa mục tiêu không thể khôi phục. </span>
                    </div>
                    <div class="popup_time-feature flex-between-align gap-15">
                        <button @click="deleteOkr()" class="button_new delete pd-816 fs-14 fw-500 lh-20">Xóa mục tiêu</button>
                        <button data-bs-dismiss="modal" class="button_new close pd-816 fs-14 fw-500 lh-20">Hủy</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- popup thêm mục tiêu  -->
        <div class="modal fade" id="exampleModal_1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog flex-align-center" style="width: 100%; height: 100%; max-width: none; margin: 0">
                <div class="modal-content popup_add_job flex-column-between posi-relative">
                    <div class="popup_add_job block"></div>
                    <div class="popup_content flex-column-between">
                        <div class="" style="height: 100%">
                            <div class="flex-between-align" style="padding: 25px 35px 0px 35px; margin-bottom: 20px">
                                <div class="popup_content-select flex-align gap-20">
                                    <button
                                        class="circle-no_select flex-align gap-8 pd-10"
                                        @click="alignment_content = 'content'"
                                        :class="{
                                            active_alignment_content: alignment_content === 'content'
                                        }">
                                        <div class="circle-boder flex-align-center">
                                            <div
                                                class="circle number_no_select flex-align-center"
                                                :class="{
                                                    active_alignment_content: alignment_content === 'content'
                                                }">
                                                1
                                            </div>
                                        </div>
                                        <div class="circle-text">Nội dung OKRs</div>
                                    </button>
                                    <button
                                        class="circle-no_select flex-align gap-8 pd-10"
                                        @click="alignment_content = 'alignment'"
                                        :class="{
                                            active_alignment_content: alignment_content === 'alignment'
                                        }">
                                        <div class="circle-boder flex-align-center">
                                            <div
                                                class="circle number_no_select flex-align-center"
                                                :class="{
                                                    active_alignment_content: alignment_content === 'alignment'
                                                }">
                                                2
                                            </div>
                                        </div>
                                        <div class="circle-text">Căn chỉnh OKRs</div>
                                    </button>
                                </div>
                                <button data-bs-dismiss="modal" class="button_close fs-16 fw-700 lh-20 flex-align-center">Đóng</button>
                            </div>
                            <div class="flex-align" style="padding: 0 35px; gap: 12px; margin-bottom: 10px">
                                <div @click="hideDropdown('cycle.popup_show_select')" class="cycle flex-align posi-relative">
                                    <div class="flex-column gap_4 popup-class" style="padding: 7px 10px">
                                        <div class="flex-between-align">
                                            <div class="flex-align">
                                                <img style="margin-bottom: 5px" :src="img('Text Type.png')" alt="" />
                                                <div class="cycle-text">Chu kỳ 1</div>
                                            </div>
                                            <img :src="img('arrow-black.svg')" alt="" />
                                        </div>
                                        <div class="flex-align gap_4">
                                            <div class="lh-24 fs-14 fw-500" style="color: #7e84a3">Tháng 7/2023</div>
                                            -
                                            <div class="lh-24 fs-14 fw-500" style="color: #7e84a3">Tháng 10/2023</div>
                                        </div>
                                    </div>

                                    <div v-if="cycle.popup_show_select" class="dropdown header_cycle posi-absolute">
                                        <div class="over_flow">
                                            <div v-for="(cycle, index) in header.cycle" :key="index" class="flex-column gap_4 hover" style="padding: 7px 10px">
                                                <div class="flex-align">
                                                    <img style="margin-bottom: 5px" :src="img('Text Type.png')" alt="" />
                                                    <div class="cycle-text">{{ cycle.name }}</div>
                                                </div>
                                                <div class="flex-align gap_4">
                                                    <div class="lh-24 fs-14 fw-500" style="color: #7e84a3">
                                                        {{ cycle.date_start }}
                                                    </div>
                                                    -
                                                    <div class="lh-24 fs-14 fw-500" style="color: #7e84a3">Tháng 12/2023</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="target flex-column gap_4">
                                    <div class="flex-column gap_4" style="padding: 5px 10px">
                                        <div class="flex-between-align">
                                            <div class="flex-align gap-10">
                                                <div class="cycle-text bland">Mục tiêu:</div>
                                                <button @click="hideDropdown('add_target.show_target_type')" class="hover flex-align gap_4 posi-relative popup-class">
                                                    <div class="flex-align gap_4">
                                                        <div class="target-type flex-align-center">C</div>
                                                        <div class="cycle-text">Cam kết</div>
                                                        <img :src="img('arrow-black.svg')" alt="" />
                                                    </div>
                                                    <div v-if="add_target.show_target_type" class="dropdown target_type posi-absolute flex-column gap-8">
                                                        <div v-for="(target_type, index) in target_type" :key="index" class="dropdown target_type-items flex-align">
                                                            <div class="target-type flex-align-center">
                                                                {{ target_type.icon }}
                                                            </div>
                                                            <div class="cycle-text" style="font-weight: 500">
                                                                {{ target_type.name }}
                                                            </div>
                                                        </div>

                                                        <div class="dropdown target_type-items flex-align">
                                                            <div class="target-type flex-align-center">C</div>
                                                            <div class="cycle-text" style="font-weight: 500">OKRs cam kết</div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div v-if="false" class="flex-align gap-8">
                                                <span class="cycle-text bland">Hiện thị:</span>
                                                <!-- chưa có  -->
                                                <div class="posi-relative popup-class">
                                                    <div @click="closeDropdown(), (add_target.followers.show_with = !add_target.followers.show_with)">
                                                        <div class="hover cycle-text" style="margin-top: 2px">Chưa có</div>
                                                    </div>

                                                    <div @click.stop v-if="add_target.followers.show_with === true" class="dropdown-more_vert posi-absolute flex-column">
                                                        <div>
                                                            <div class="fs-14 fw-500" style="margin-bottom: 8px; color: #7e84a3">Hiện thị với</div>
                                                            <div>
                                                                <label v-for="(selec_member, index) in add_target.followers.list" :key="index" class="hover flex-between-align fs-14 fw-500" style="margin-bottom: 8px; padding: 7px 10px">
                                                                    <div class="flex-align gap_4">
                                                                        <img :src="img(selec_member.icon)" alt="" />
                                                                        <div>{{ selec_member.name }}</div>
                                                                    </div>
                                                                    <input name="abc" type="radio" />
                                                                </label>
                                                            </div>
                                                            <div @click="specifically(), closeDropdown()" class="popup-class hover flex-between-align" style="margin-bottom: 8px; padding: 7px 10px">
                                                                <div class="flex-align gap_4">
                                                                    <img :src="img('account.svg')" alt="" />
                                                                    <span class="fs-14 fw-500">Người cụ thể</span>
                                                                </div>
                                                                <img :src="img('arrow_right.svg')" alt="" />
                                                            </div>
                                                        </div>
                                                        <div class="content-header-add_okr select flex-align-center fs-14 fw-500 lh-26">Xác nhận</div>
                                                    </div>

                                                    <div v-if="add_target.followers.specific_person && !add_target.followers.show_with" class="dropdown-more_vert posi-absolute flex-column" style="right: -277px; width: 277px; padding: 3px">
                                                        <div class="pd-710">
                                                            <div class="mg_b-8 flex-align gap_4">
                                                                <img class="hover" :src="img('arrow_left.svg')" alt="" />
                                                                <span class="cycle-text">Hiển thị với người cụ thể</span>
                                                            </div>
                                                            <div class="pd-810 brr-12" style="border: 1px solid #d9e4ff; overflow: hiden">
                                                                <div class="flex-align gap_4">
                                                                    <img :src="img('search.svg')" alt="" />
                                                                    <input style="width: 100%" type="text" placeholder="Tìm kiếm người..." />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="over_flow" style="max-height: 18vh; padding: 0 10px">
                                                            <label v-for="(item, index) in member" :key="index" class="active_member pd-810 flex-between-align">
                                                                <div class="flex-align gap_4">
                                                                    <img class="imge-20" :src="item.img" alt="" />
                                                                    <div>{{ item.name }}</div>
                                                                    {{ abc1 }}
                                                                </div>
                                                                <input v-model="abc1" :value="item.name" type="checkbox" />
                                                            </label>
                                                        </div>
                                                        <div class="pd-710">
                                                            <div class="content-header-add_okr select flex-align-center fs-14 fw-500 lh-26 mg_b-8">Xác nhận</div>
                                                            <div class="select hover flex-align-center fs-14 fw-500 lh-26" style="border-radius: 12px; border: 1px solid #d9e4ff">Đóng</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="false" class="flex-align gap-8">
                                                <div class="target-type-null"></div>
                                                <div class="target-type-public">Công khai</div>
                                            </div>
                                            <div v-if="true" class="flex-align gap_4">
                                                <div class="flex-align gap_4">
                                                    <span class="cycle-text bland">Hiện thị:</span>
                                                    <span class="cycle-text">người cụ thể</span>
                                                </div>
                                                <div class="position-relative popup-class">
                                                    <div @click="abc" class="hover flex-align gap_4" style="padding-left: 15px">
                                                        <div class="flex-align">
                                                            <img style="margin-left: -10px; width: 24px; height: 24px; border-radius: 24px; border: 2px solid #fff" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />

                                                            <img style="margin-left: -10px; width: 24px; height: 24px; border-radius: 24px; border: 2px solid #fff" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />
                                                            <img style="margin-left: -10px; width: 24px; height: 24px; border-radius: 24px; border: 2px solid #fff" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />
                                                        </div>
                                                        <img :src="img('arrow-black.svg')" alt="" />
                                                    </div>

                                                    <div class="dropdown-more_vert posi-absolute flex-column" style="right: 0, transform:none">
                                                        <div>
                                                            <div class="mg_b-8 flex-align gap_4">
                                                                <img class="hover" :src="img('arrow_left.svg')" alt="" />
                                                                <span class="cycle-text">Hiển thị với người cụ thể</span>
                                                            </div>
                                                            <div>
                                                                <label v-for="(selec_member, index) in add_target.followers.list" :key="index" class="hover flex-between-align fs-14 fw-500" style="margin-bottom: 8px; padding: 7px 10px">
                                                                    <div class="flex-align gap_4">
                                                                        <img :src="img(selec_member.icon)" alt="" />
                                                                        <div>{{ selec_member.name }}</div>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="content-header-add_okr select flex-align-center fs-14 fw-500 lh-26">Xác nhận</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="color: #131523; font-size: 16px; font-style: normal; font-weight: 700; line-height: normal">Tăng sản lượng sản phẩm của công ty lên 170% trong quý 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="key_results flex-column">
                                <!-- bảng kr trong popup thêm mục tiêu  -->
                                <div v-for="(item, index) in popup_add_target.key_results" :key="index" in class="">
                                    <!-- <div>1212</div> -->

                                    <div class="key_results-items flex-column posi-relative">
                                        <div class="flex-between-align">
                                            <div class="flex-align gap-10">
                                                <div class="select_KR-color flex-align-center fs-12 fw-700 lh-14" style="color: #fff">KR{{ index + 1 }}</div>
                                                <div class="cycle-text bland fw-500">
                                                    {{ item.name }}
                                                </div>
                                            </div>
                                            <div class="flex-align gap-8" style="cursor: pointer">
                                                <span class="cycle-text bland" style="margin-bottom: 2.5px">Dạng:</span>
                                                <button @click="closeDropdown(), (kr_form.show = index)" class="hover flex-align posi-relative popup-class">
                                                    <span class="cycle-text">Outcome</span>
                                                    <img :src="img('arrow-black.svg')" alt="" />
                                                    <div v-if="kr_form.show === index" style="box-shadow: -2px 14px 18px 0px rgba(0, 0, 0, 0.04), 0px 4px 24px 0px rgba(0, 0, 0, -2.91); cursor: auto" class="dropdown-more_vert posi-absolute flex-column gap-8">
                                                        <div v-for="(kr_form, index) in kr_form" :key="index" class="dropdown target_type-items hover fs-14 fw-500">
                                                            {{ kr_form.name }}
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="button conttent flex-column gap_4">
                                            <div class="fw-400 fs-14" style="color: #5a607f">Nhập nội dung<span style="color: #f12b43">*</span></div>
                                            <input class="text-14-600" type="text" placeholder="Tăng sản lượng sản phẩm của công ty lên 170% trong quý 2" />
                                        </div>
                                        <div class="flex-align gap-20">
                                            <div @blur="item.dropdown_measure = false" tabindex="1" class="posi-relative popup-class">
                                                <div class="flex-between-align button conttent hover flex-between-align gap-15" @click="closeDropdown(item), (item.dropdown_measure = !item.dropdown_measure)">
                                                    <div class="flex-column gap_4">
                                                        <div class="fw-400 fs-14" style="color: #5a607f">Đơn vị đo lường của KR<span style="color: #f12b43">*</span></div>
                                                        <div class="text-14-600">(%)</div>
                                                    </div>
                                                    <img :src="img('arrow-black.svg')" alt="" />
                                                </div>

                                                <div v-if="item.dropdown_measure" class="dropdown header_cycle posi-absolute" style="width: 100%; box-shadow: 0px 14px 18px 0px rgba(0, 0, 0, 0.03), 0px 4px 24px 0px rgba(0, 0, 0, 0.09)">
                                                    <div class="over_flow" style="max-height: 20vh">
                                                        <div v-for="(measure, index) in measure" :key="index" class="flex-column gap_4 hover_show" style="padding: 7px 10px" @click="selectMeasure(item)">
                                                            <div class="flex-between-align">
                                                                <div class="cycle-text" style="font-weight: 500">
                                                                    {{ measure.name }}
                                                                </div>

                                                                <div class="icon_delete"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div @click="closeDropdown(item), (item.dropdown_import_measure = !item.dropdown_import_measure), (item.dropdown_measure = false)" class="opacity popup_content-text pd-710 popup-class" style="margin: 10px; cursor: pointer">+ Tạo mới</div>
                                                </div>

                                                <div v-if="item.dropdown_import_measure && !item.dropdown_measure" class="dropdown posi-absolute pd-2023" style="cursor: auto; width: 100%; box-shadow: rgba(0, 0, 0, 0.04) -2px 14px 18px 0px, rgba(0, 0, 0, 0) 0px 4px 24px 0px">
                                                    <div class="flex-column gap-10">
                                                        <div class="popup_content-text" style="font-weight: 700">Tạo giá trị đo lương mới</div>
                                                        <div class="fs-14 fw-500">Nhập giá trị đo lường</div>

                                                        <input @click="test2" style="margin-bottom: 10px" class="search input pd-710 fs-14 fw-500" type="text" placeholder="Nhập giá trị..." />
                                                    </div>
                                                    <div class="content-header-add_okr select flex-align-center fs-14 fw-500 lh-26">Xác nhận</div>
                                                </div>
                                            </div>

                                            <div class="button conttent flex-align posi-relative" style="width: calc(100% - 272.53px); overflow: hidden">
                                                <div class="button-starting_value flex-column gap_4">
                                                    <div class="flex-align gap_4">
                                                        <img :src="img('flag_violet.svg')" alt="" />
                                                        <span class="fw-400 fs-14" style="color: #5a607f">Giá trị khởi điểm (tùy chọn)</span>
                                                    </div>
                                                    <div class="text-14-600" style="margin-left: 5px">120%</div>
                                                </div>

                                                <div class="button-starting_value flex-column gap_4" style="margin-left: 45px">
                                                    <div class="flex-align gap_4">
                                                        <img :src="img('flag_blu.svg')" alt="" />
                                                        <span class="fw-400 fs-14" style="color: #5a607f">Giá trị mục tiêu<span style="color: #f12b43">*</span></span>
                                                    </div>
                                                    <div class="text-14-600" style="margin-left: 5px">120%</div>
                                                </div>

                                                <div class="arrow posi-absolute">
                                                    <div class="hide posi-absolute"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="icon_delete_red flex-align-center posi-absolute">
                                            <img :src="img('delete_red.svg')" alt="" />
                                        </div>

                                        <div class="posi-absolute" style="left: -11px; top: 115px">
                                            <div>
                                                <div class="posi-relative">
                                                    <img class="icon_drag flex-align-center" :src="img('drag_indicator.svg')" alt="" />
                                                    <div class="boder_icon_drag flex-align-center posi-absolute"></div>
                                                </div>
                                            </div>
                                            <div class="ellipse posi-absolute"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- phần thêm kết quả chính  -->
                        <div class="add_key_results flex-align gap_4">
                            <img :src="img('plus.svg')" alt="" />
                            <div class="popup_content-text">Thêm kết quả chính</div>
                        </div>
                    </div>
                    <div class="footer gap-20">
                        <div class="button cancel pd-1025 br-12 flex-align">Hủy</div>
                        <div class="button next pd-1025 br-12 flex-align">Bước tiếp</div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>

    <div class="wrap">
        <div class="content">
            <div class="content-header flex-between-align">
                <div class="flex-align gap-8">
                    <img class="content-header-avatar" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />

                    <span class="content-header-title fs-20 fw-700 lh-36">Tuấn Anh</span>
                </div>

                <div class="flex-align gap-10">
                    <button class="content-header-feature flex-align gap-10">
                        <div class="select flex-align gap_4 pd-8">
                            <div class="icon_family-history"></div>
                            <div class="icon_view-list"></div>
                        </div>
                    </button>

                    <div @click="hideDropdown('choose_people.show')" class="posi-relative popup-class">
                        <button class="content-header-feature flex-align gap-10">
                            <div class="select flex-between-align pd-812 gap_4">
                                <div class="flex-align" style="gap: 4px">
                                    <img :src="img('everybody.svg')" alt="" />
                                    <div class="fw-500 fs-14 flex-align lh-24">Tất cả mọi người</div>
                                </div>
                                <img :src="img('arrow-bottom.svg')" alt="" />
                            </div>
                        </button>
                        <!-- dropdown chọn người  -->
                        <div v-if="choose_people.show" @click.stop class="dropdown everybody posi-absolute flex-column gap-8">
                            <div class="search input" style="padding: 7px 10px; margin: 7px 10px 0px 10px">
                                <div class="icon_search"></div>
                                <input class="search-input fs-14 fw-400 lh-20" style="width: 100%" type="text" placeholder="Tìm kiếm..." />
                            </div>
                            <div class="flex-column gap-8" style="margin: 0 10px">
                                <div class="flex-align gap-8">
                                    <div class="lh-24 fs-14 fw-500" style="color: #7e84a3; width: 100px">OKrs của tôi</div>
                                    <div class="dashed"></div>
                                </div>
                                <div class="search member bgr flex-align gap_4">
                                    <img class="search avatar" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />
                                    <div class="fs-14 fw-500 lh-24" style="color: #131523">Tuấn Anh</div>
                                </div>
                            </div>
                            <div class="flex-column gap-8">
                                <div class="flex-align gap-8" style="margin: 0 10px">
                                    <div class="lh-24 fs-14 fw-500" style="color: #7e84a3; width: 100px">OKrs liên quan</div>
                                    <div class="dashed"></div>
                                </div>
                                <div class="over_flow" style="max-height: 20vh; padding: 0px 10px">
                                    <div class="search member flex-between-align" style="border: 0px solid" v-for="(avatar, index) in member" :key="index">
                                        <div class="flex-align gap_4">
                                            <img class="search avatar" :src="avatar.img" alt="" />
                                            <div class="fs-14 fw-500 lh-24" style="color: #131523">
                                                {{ avatar.name }}
                                            </div>
                                        </div>
                                        <!-- <img :src="img(avatar.icon_color)" alt="" /> -->
                                        <!-- nếu có key ưu thích thì sẽ v-if icon k có màu -->
                                        <img @click="test(avatar, index)" :src="img(avatar.icon)" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button @click="hideDropdown('cycle.show_select')" class="content-header-feature flex-align gap-10 posi-relative popup-class">
                        <div class="select flex-between-align pd-812 gap_4">
                            <div class="flex-align" style="gap: 4px">
                                <div class="icon_calendar"></div>
                                <div class="fw-500 fs-14 flex-align lh-24">Chu kỳ: 3/2023 - 7/2023</div>
                            </div>
                            <img :src="img('arrow-bottom.svg')" alt="" />
                        </div>
                        <div v-if="cycle.show_select" class="dropdown header_cycle posi-absolute">
                            <div class="over_flow">
                                <div v-for="(cycle, index) in header.cycle" :key="index" class="flex-column gap_4 hover" style="padding: 7px 10px">
                                    <div class="flex-align">
                                        <img style="margin-bottom: 5px" :src="img('Text Type.png')" alt="" />
                                        <div class="cycle-text">{{ cycle.name }}</div>
                                    </div>
                                    <div class="flex-align gap_4">
                                        <div class="lh-24 fs-14 fw-500" style="color: #7e84a3">
                                            {{ cycle.date_start }}
                                        </div>
                                        -
                                        <div class="lh-24 fs-14 fw-500" style="color: #7e84a3">Tháng 12/2023</div>
                                    </div>
                                </div>
                            </div>

                            <div class="opacity popup_content-text pd-710" style="margin: 10px; cursor: pointer">+ Tạo chu kỳ mới</div>
                        </div>
                    </button>

                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal_1" class="content-header-add_okr select flex-align fs-14 fw-700 lh-26">Thêm mục tiêu</button>
                </div>
            </div>

            <div class="flex-column gap-30" style="overflow: auto; height: calc(100% - 95px); padding: 0 50px 30px 60px">
                <div v-for="(item, index) in popup_add_target.key_results" :key="index" :class="img(item.icon)" class="content-body">
                    <div class="targets flex-column gap-30">
                        <div class="targets-okrs flex-between-align">
                            <div class="targets-okrs-left flex-align gap-15">
                                <div class="targets-okrs-left-link flex-column gap-15">
                                    <img :src="img('link-top.svg')" alt="" />
                                    <!-- <div class="link_top"></div> -->
                                    <div class="move-left">
                                        <span class="okrs" style="padding: 2px 8px">O{{ index + 1 }}</span>
                                    </div>
                                    <img :src="img('link-bottom.svg')" alt="" />
                                    <!-- <div c></div> -->
                                </div>
                                <div class="targets-okrs-left-text flex-column" style="gap: 17.5px">
                                    <div class="targets-okrs-left-text-me flex-align gap-15">
                                        <div class="people-member flex-align gap_4">
                                            <img class="people-avatar" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />
                                            <div class="people-name">Tuấn Anh</div>
                                        </div>
                                        <span class="people-set">+Set alignment</span>
                                    </div>
                                    <div class="targets-okrs-left-text-okr">Hoàn thiện SMIT GATE chỉn chu về giao diện và trải nghiệm để sẵn sàng cho quý 2 (C)</div>
                                    <div class="targets-okrs-left-text-widthme">
                                        <div class="flex-align gap-15">
                                            <div class="people-withme flex-align gap_4">
                                                <img class="people-avatar" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />
                                                <span class="people-set fs-12">Tuấn Anh</span>
                                            </div>

                                            <div class="people-withme flex-align gap_4">
                                                <img class="people-avatar" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />
                                                <span class="people-set fs-12">Tuấn Anh</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="targets-okrs-right flex-column-between">
                                <div class="targets-okrs-right-category flex-align gap-10">
                                    <div class="flex-align gap-15">
                                        <div class="flex-align gap_4">
                                            <div class="target-type flex-align-center">C</div>
                                            <div class="target-type-name">Cam kết</div>
                                        </div>
                                        <div class="solit" style="height: 10px"></div>
                                        <div class="flex-align gap_4">
                                            <div class="target-type-null"></div>
                                            <div class="target-type-public">Công khai</div>
                                        </div>
                                        <div class="flex-align gap-20">
                                            <span>Hiện thị với người cụ thể</span>
                                            <div class="flex-align">
                                                <img style="margin-left: -10px; width: 24px; height: 24px; border-radius: 24px; border: 2px solid #fff" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />
                                                <img style="margin-left: -10px; width: 24px; height: 24px; border-radius: 24px; border: 2px solid #fff" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />
                                                <img style="margin-left: -10px; width: 24px; height: 24px; border-radius: 24px; border: 2px solid #fff" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="posi-relative">
                                        <img @click="closeDropdown(), (table.show_more = index)" class="icon_more_vert popup-class" style="cursor: pointer" :src="img('more-vert.svg')" alt="" />
                                        <div v-if="table.show_more === index" class="dropdown-more_vert posi-absolute flex-column gap-8">
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="dropdown-more_vert-hover flex-between-align">
                                                <span>Xóa</span>
                                                <div class="icon_delete"></div>
                                            </button>

                                            <button class="dropdown-more_vert-hover flex-between-align">
                                                <span>Chỉnh sửa</span>
                                                <div class="icon_fix"></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: flex-end; margin-right: 25px">
                                    <div class="half-circle posi-relative">
                                        <div class="half-circle-text">50%</div>
                                        <div class="half-circle-value posi-absolute"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="krs flex-column gap-10">
                            <div class="krs-kr flex-between-align">
                                <div class="krs-kr-name flex-align gap-10">
                                    <div class="krs-kr-name-text-pding fs-12 fw-500 lh-14" style="color: #000; background: linear-gradient(167deg, rgba(0, 152, 61, 0.14) 73.89%, rgba(0, 152, 61, 0.14) 125.35%); border: 1px solid #17e180">KR{{ index + 1 }}</div>
                                    <div class="krs-kr-name-text-pding fw-700 fs-12 lh-14" style="background: rgba(217, 44, 232, 0.15)">IP</div>
                                    <div class="krs-kr-name-text lh-36 fs-14 fw-500">Xác định và hoàn thành ít nhất 5 điểm cần cải thiện về giao diện và trải nghiệm trong quá trình beta</div>
                                </div>
                                <div class="krs-kr-evaluate flex-align gap-15">
                                    <div class="krs-kr-evaluate-text">1/5 điểm</div>
                                    <div class="krs-kr-evaluate-progress">
                                        <div class="krs-kr-evaluate-progress-value"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- test  -->
                            <div class="krs-kr flex-between-align">
                                <div class="krs-kr-name flex-align gap-10">
                                    <div class="krs-kr-name-text-pding fs-12 fw-500 lh-14" style="color: #000; background: linear-gradient(167deg, rgba(0, 152, 61, 0.14) 73.89%, rgba(0, 152, 61, 0.14) 125.35%); border: 1px solid #17e180">KR2</div>
                                    <div class="krs-kr-name-text-pding fw-700 fs-12 lh-14" style="background: rgba(217, 44, 232, 0.15)">IP</div>
                                    <div class="krs-kr-name-text lh-36 fs-14 fw-500">Xác định và hoàn thành ít nhất 5 điểm cần cải thiện về giao diện và trải nghiệm trong quá trình beta</div>
                                </div>
                                <div class="krs-kr-evaluate flex-align gap-15">
                                    <div class="krs-kr-evaluate-text">1/5 điểm</div>
                                    <div class="krs-kr-evaluate-progress">
                                        <div class="krs-kr-evaluate-progress-value"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="krs-note flex-align">
                            <img :src="img('note.svg')" alt="" />
                            <input class="krs-note-input" type="text" placeholder="Note lại đây..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'

export default {
    data() {
        return {
            followers: {
                show_dropdown: true,
                data: ''
            },

            abc1: [],
            // object_table: {
            //   show_more: false,
            // },
            table: {
                show_more: null
            },
            add_target: {
                show_target_type: false,
                followers: {
                    show_with: false,
                    specific_person: false,
                    list: [
                        {
                            name: 'Chỉ mình tôi',
                            icon: 'lock.svg'
                        },
                        {
                            name: 'Công khai',
                            icon: 'curtains.svg'
                        }
                    ]
                }
            },
            kr_form: {
                show: null
            },
            choose_people: {
                show: false
            },
            cycle: {
                show_select: false,
                popup_show_select: false
            },

            alignment_content: 'content',
            measure: [
                {
                    name: '%'
                },
                {
                    name: 'Tỷ'
                },
                {
                    name: 'Giờ'
                },
                {
                    name: 'Người'
                },
                {
                    name: 'Quy trình'
                }
            ],
            header: {
                cycle: [
                    {
                        name: 'Chu kỳ 1',
                        icon: 'people.svg',
                        date_end: 'Tháng 12/2023',
                        date_start: 'Tháng 12/2023'
                    },
                    {
                        name: 'Chu kỳ 2',
                        icon: 'people.svg',
                        date_end: 'Tháng 12/2023',
                        date_start: 'Tháng 12/2023'
                    },
                    {
                        name: 'Chu kỳ 2',
                        icon: 'people.svg',
                        date_end: 'Tháng 12/2023',
                        date_start: 'Tháng 12/2023'
                    },
                    {
                        name: 'Chu kỳ 2',
                        icon: 'people.svg',
                        date_end: 'Tháng 12/2023',
                        date_start: 'Tháng 12/2023'
                    },
                    {
                        name: 'Chu kỳ 2',
                        icon: 'people.svg',
                        date_end: 'Tháng 12/2023',
                        date_start: 'Tháng 12/2023'
                    },
                    {
                        name: 'Chu kỳ 2',
                        icon: 'people.svg',
                        date_end: 'Tháng 12/2023',
                        date_start: 'Tháng 12/2023'
                    }
                ]
            },

            target_type: [
                {
                    name: 'OKRs cam kết',
                    icon: 'A'
                },
                {
                    name: 'OKRs khát vọng',
                    icon: 'A'
                },
                {
                    name: 'OKRs học tập',
                    icon: 'L'
                }
            ],
            member: [
                {
                    img: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
                    name: ' Tuấn Anh',
                    icon: 'grade.svg'
                },
                {
                    img: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
                    name: 'Hải',
                    icon: 'grade.svg'
                },
                {
                    img: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
                    name: 'Cò',
                    icon: 'grade.svg'
                },
                {
                    img: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
                    name: 'Chiến',
                    icon: 'grade.svg'
                },
                {
                    img: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
                    name: 'Chiến',
                    icon: 'grade.svg'
                },
                {
                    img: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
                    name: 'Chiến',
                    icon: 'grade.svg'
                },
                {
                    img: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
                    name: 'Chiến',
                    icon: 'grade.svg'
                },
                {
                    img: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
                    name: 'Chiến',
                    icon: 'grade.svg'
                }
            ],
            popup_add_target: {
                key_results: [
                    {
                        name: 'Cá nhân',
                        dropdown_measure: false,
                        dropdown_import_measure: false
                    },
                    {
                        name: 'Tổ chức',
                        dropdown_measure: false,
                        dropdown_import_measure: false
                    },
                    {
                        name: 'Tổ chức',
                        dropdown_measure: false,
                        dropdown_import_measure: false
                    }
                ]
            },
            kr_form: [
                {
                    name: 'Input'
                },
                {
                    name: 'Output'
                },
                {
                    name: 'Outcome'
                }
            ]
        }
    },

    mounted() {},

    methods: {
        specifically() {
            this.add_target.followers.specific_person = !this.add_target.followers.specific_person
            this.add_target.followers.show_with = false
        },
        selectMeasure(item) {
            item.dropdown_measure = false
        },
        closeDropdown(item) {
            const closeFunction = event => {
                if (!event.target.closest('.popup-class')) {
                    if (item) {
                        item.dropdown_measure = false
                        item.dropdown_import_measure = false
                    }
                    if (this.add_target.followers.show_with === true) {
                        this.add_target.followers.show_with = false
                    }
                    if (this.add_target.followers.specific_person === true) {
                        this.add_target.followers.specific_person = false
                    }
                    this.kr_form.show = null
                    this.table.show_more = null

                    window.removeEventListener('click', closeFunction)
                }
            }

            window.addEventListener('click', closeFunction)
        },
        img(value) {
            return `/images/okrs/${value}`
        },
        deleteOkr() {
            alert('test')
            $('#exampleModal').modal('hide')
        },
        hideDropdown(keyPath) {
            const keys = keyPath.split('.')
            let target = this

            for (let i = 0; i < keys.length - 1; i++) {
                target = target[keys[i]]
            }
            const lastKey = keys[keys.length - 1]
            const reactiveTarget = reactive(target)
            reactiveTarget[lastKey] = !reactiveTarget[lastKey]
            const closeFunction = event => {
                if (!event.target.closest('.popup-class')) {
                    reactiveTarget[lastKey] = false
                    window.removeEventListener('click', closeFunction)
                }
            }

            window.addEventListener('click', closeFunction)
        },

        test(avatar) {
            if (avatar.icon === 'grade.svg') {
                avatar.icon = 'grade_color.svg'
            } else if (avatar.icon === 'grade_color.svg') {
                avatar.icon = 'grade.svg'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$url: '/images/okrs/';
::-webkit-scrollbar-thumb {
    width: 6.688px;
    height: 118.417px;
    flex-shrink: 0;
    border-radius: 6px;
    background: #d7dbec;
}
.wrap {
    width: calc(100% - 105px);
    height: calc(100% - 70px);
}
.content {
    padding: 0 10px 0 0;
    &-header {
        padding: 30px 50px 25px 60px;
        // margin-bottom: 25px;
        &-add_okr {
            color: #ffffff;
            background: var(--gradient);
            padding: 7px 35px;
            &:hover {
                opacity: 0.7;
            }
        }
        &-title {
            color: var(--color_text);
        }
        &-avatar {
            width: 28px;
            height: 28px;
            border-radius: 50px;
        }
    }
    &-body {
        background: #ffffff;
        border-radius: 20px;
        padding: 30px;
    }
}
.dropdown-more_vert {
    right: -230px;
    width: 230px;
    transform: translateX(-100%);
    border-radius: 12px;
    border: 1px solid #d7dbec;
    background: #fff;
    box-shadow: 0px 14px 18px 0px rgba(0, 0, 0, 0.05), 0px 4px 24px 0px rgba(0, 0, 0, 0.09);
    top: calc(100% + 10px);
    text-align: start;
    padding: 10px 13px;
    z-index: 1;
    &-hover {
        padding: 7px 10px;
        border-radius: 12px;
        &:hover {
            background: #f5f6fa;
            .icon_fix {
                background: rgb(42, 141, 255);
            }
            .icon_delete {
                background: red;
            }
        }
    }
}
.hover_show {
    padding: 7px 10px;
    border-radius: 12px;
    .icon_delete {
        background: none;
    }
    &:hover {
        cursor: pointer;
        background: #f5f6fa;
        .icon_delete {
            background: #1c1b1f;
        }
    }
}
.targets {
    &-okrs {
        height: 111px;
        &-left {
            margin-left: 10px;
            height: 100%;
            &-text {
                &-okr {
                    color: var(--color_text);
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 700;
                }
            }
        }
        &-right {
            height: 100%;
            gap: 33px;
        }
    }
}
.half-circle {
    border-radius: 50%;
    border: 6px solid #d7dbec;
    height: 85px;
    width: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%);
    &-text {
        margin-bottom: 15px;
        color: #131523;
        font-size: 20px;
        font-style: normal;
        font-weight: 800;
        line-height: 20px;
    }
    &-value {
        border-radius: 50%;
        border: 6px solid red;
        height: 85px;
        width: 85px;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%);
    }
}

.target-type {
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    padding: 2.7px;
    background: var(--gradient);
    border-radius: 50px;
    width: 18px;
    height: 18px;
    &-null {
        width: 6.432px;
        height: 6.432px;
        background: var(--gradient);
        border-radius: 50px;
    }
    &-name {
        color: var(--color_text);
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 25px;
    }
    &-public {
        color: var(--color_text);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 21px;
    }
}
.krs {
    &-note {
        gap: 11px;
        &-input {
            border: none;
            outline: none;
            color: #a1a7c4;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 36px;
        }
    }
    &-kr {
        padding: 17px 20px;
        gap: 12px;
        border-radius: 12px;
        background: rgba(245, 246, 250, 0.7);

        &-name {
            &-text {
                color: #131523;
                font-style: normal;
                &-pding {
                    padding: 3px 13px;
                    border-radius: 22px;

                    height: 20px;
                    display: flex;
                    align-items: center;
                }
            }
        }
        &-evaluate {
            &-texxt {
                color: #131523;
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: 20px;
            }
            &-progress {
                height: 6px;
                width: 120px;
                background: #e0e0e0;
                border-radius: 5px;
                &-value {
                    height: 6px;
                    width: 30px;
                    background: red;
                    border-radius: 5px;
                }
            }
        }
    }
}

.okrs {
    color: #fff;
    font-size: 15px;
    font-style: normal;
    font-weight: 900;
    line-height: 14px;
    border-radius: 12px;
    background: var(--gradient);
    border: 0.5px solid #fff;
    box-shadow: 0px 0px 9px 0px rgba(39, 228, 160, 0.41);
    height: 24px;
}

.move-left {
    margin-left: -20px;
    height: 24px;
}
.icon_search {
    width: 24px;
    height: 24px;
    background: var(--more);
    -webkit-mask-image: url($url + 'icon-search.svg');
}

.icon_calendar {
    width: 20px;
    height: 20px;
    background: #1c1b1f;
    -webkit-mask-image: url($url + 'calendar.svg');
}
.icon_search {
    width: 20px;
    height: 20px;
    background: #1c1b1f;
    -webkit-mask-image: url($url + 'search.svg');
}
.icon_delete {
    width: 24px;
    height: 24px;
    background: #1c1b1f;
    -webkit-mask-image: url($url + 'delete.svg');
}
.icon_fix {
    width: 24px;
    height: 24px;
    background: #1c1b1f;
    -webkit-mask-image: url($url + 'fix.svg');
}
.icon_more_vert {
    border: 1px solid #fff;
    &:hover {
        border: 1px solid rgba(0, 0, 0, 0.13);
        border-radius: 50%;
    }
}
.icon_view-list {
    width: 20px;
    height: 20px;
    background: var(--gradient);
    -webkit-mask-image: url($url + 'view-list.svg');
    // &:hover {
    //   background: var(--gradient);
    //   opacity: 0.3;
    // }
}
.icon_family-history {
    width: 20px;
    height: 20px;
    background: #131523;
    -webkit-mask-image: url($url + 'family-history.svg');
    &:hover {
        background: var(--gradient);
        opacity: 0.3;
    }
}
.icon_delete_red {
    width: 28px;
    height: 28px;
    padding: 7px;
    background: red;
    border: 3px solid #fff;
    border-radius: 50%;
    right: -7px;
    top: -7px;
    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }
}
.boder_icon_drag {
    border: 1px solid #0dc480;
    border-radius: 20px;
    width: 22px;
    height: 33px;

    left: -1px;
    bottom: -1px;
    clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
}
.icon_drag {
    padding: 5px 0;
    border: 1px solid #d9e4ff;
    border-radius: 20px;
    width: 20px;
    height: 31px;
    background: #fff;
}
.arrow {
    width: 80px;
    height: 80px;
    border: 1px solid #d7dbec;
    left: 300px;
    transform: rotate(45deg);
    border-radius: 12px;
}
.add_key_results {
    padding: 5px;
    cursor: pointer;
    width: 175px;
    margin: 25px 66.66px;
    &:hover {
        opacity: 0.7;
    }
}
.over_flow {
    overflow: auto;
    max-height: 30vh;
    padding: 7px 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.hide {
    width: 120px;
    height: 94px;
    background: #fff;
    transform: rotate(45deg);
    top: 0px;
    left: -53px;
}
.button_new {
    height: 36px;
    width: 50%;
    border-radius: 10px;
    &.delete {
        background: #f12b43;
        color: #fff;
        &:hover {
            opacity: 0.7;
        }
    }
    &.close {
        color: #718096;
        &:hover {
            background: #f5f6fa;
        }
    }
}
.target-type {
    &:hover {
        cursor: pointer;
    }
}
.key_results {
    height: 535px;
    // height: calc(100% - 151px);
    margin: 0px 5px;
    overflow: auto;
    &-items {
        // position: relative;
        background: #fff;
        min-height: 258px;
        margin: 0px 30px;
        border-radius: 20px;
        border-left: 1px solid #0dc480;
        box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.05);
        padding: 25px 35px 35px;
        gap: 19px;
        margin-top: 10px;
    }
}
// .key_results-items::before {
//   content: "";
//   position: absolute;
//   left: 0;
//   top: 0;
//   bottom: 0;
//   width: 1px;
//   background: linear-gradient(-180deg, #19dc7e -24.9%, #0caa94 86.3%);
//   border-radius: 20px;
//   z-index: 0;
// }
.circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    &-no_select {
        border-radius: 34px;
        height: 42px;
        border: 1px solid transparent;
        &:hover {
            border: 1px solid #fff;
            cursor: pointer;
        }
        &.active_alignment_content {
            border-radius: 34px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid #fff;
            height: 42px;
        }
    }
    &.number_no_select {
        color: #fff;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px;
        &.active_alignment_content {
            background: #fff;
            color: #0aba81;
        }
    }
    &-boder {
        border: 1px solid #fff;
        width: 28px;
        height: 28px;
        border-radius: 50%;
    }
    &-text {
        color: #fff;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px;
    }
}
.cycle {
    padding: 14px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.05);
    height: 94px;
    min-width: 266px;
    &:hover {
        background: #f5f6fa;
        cursor: pointer;
    }
    &-text {
        color: #131523;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        &.bland {
            color: #131523;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }
}
.target {
    padding: 14px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.05);
    height: 94px;
    width: 100%;
}
.wrap_poup {
    // background: rgba(29, 29, 29, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    position: fixed;
}

.popup_time {
    padding: 12px 20px 20px 20px;
    gap: 24px;
    border-radius: 20px;
    background: #fff;
}

.popup_add_job {
    width: 1180px;
    height: 880px;
    border-radius: 20px;
    overflow: hidden;
    background: #ececec;
    &.block {
        margin: 4px 4px 0 4px;
        width: calc(100% - 8px);
        height: 130px;
        border-radius: 16px;
        // background: linear-gradient(-358deg, #19dc7e -18.14%, #0caa94 118.01%),
        //   linear-gradient(1379deg, #17e1ff 9.19%, #009883 99.81%);
        // transform: rotate(180deg);
        background: linear-gradient(-180deg, #19dc7e -24.9%, #0caa94 86.3%);
    }
}
.footer {
    display: flex;
    justify-content: flex-end;
    padding: 17px 23px;
    background: #fff;
}
.popup_content {
    width: 100%;
    height: calc(100% - 70.76px);
    position: absolute;
    &-select {
    }
    &-text {
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        background: var(--Color, linear-gradient(167deg, #17e180 -19.24%, #009883 125.35%));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
.button_close {
    color: #fff;
    padding: 5px 10px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.15);
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
}
// .link_top {
//   border-top: 1px solid;
//   border-left: 1px solid;
//   border-top-left-radius: 5px;
//   // height: auto;
//   height: 32px;
// }
.active_member {
    &:hover {
        cursor: pointer;
    }
}
</style>
