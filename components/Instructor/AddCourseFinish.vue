<script setup lang="ts"></script>

<template>
  <div class="dashboard_add_course_finish">
    <form action="#">
      <div class="row">
        <div class="col-xl-12">
          <div class="add_course_more_info_input">
            <label for="#">Message for Reviewer</label>
            <textarea rows="7" placeholder="Message for Reviewer"></textarea>
          </div>
        </div>
        <div class="col-xl-12">
          <div class="mb-0 add_course_more_info_input">
            <label for="#">Status *</label>
            <select class="select_2">
              <option value="">Please Select</option>
              <option value="">Red</option>
              <option value="">Black</option>
              <option value="">Orange</option>
              <option value="">Rose Gold</option>
              <option value="">Pink</option>
            </select>
            <button type="submit" class="common_btn mt_25">save</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
