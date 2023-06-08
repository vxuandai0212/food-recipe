<template>
  <div>
    <el-table :data="tokenList" size="mini" class="token-table">
      <el-table-column label="Device Token">
        <template slot-scope="{row}">
          <el-tooltip :content="row.token" placement="top-start" effect="dark" :open-delay="300">
            <span>{{ row.token }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Thiết bị">
        <template slot-scope="{row}">
          <el-tooltip :content="row.deviceName" placement="top-start" effect="dark" :open-delay="300">
            <span>{{ row.deviceName }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Ngày tạo">
        <template slot-scope="{row}">
          <el-tooltip :content="getTokenTimeStr(row.createdAt)" placement="top-start" effect="dark" :open-delay="300">
            <span>{{ getTokenTimeStr(row.createdAt) }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column width="198px">
        <template #header>
          <el-button
            type="primary"
            size="mini"
            class="btn-icon float-right"
            style="margin-right: 34px;"
            @click="onCreate"
          >
            <svg-icon icon-class="plus" />
          </el-button>
        </template>
        <template slot-scope="{row}">
          <el-button type="primary" plain size="mini" @click="onEdit(row)">Chỉnh sửa</el-button>
          <el-button type="danger" plain size="mini" class="btn-icon" @click="onRemove(row)">
            <svg-icon icon-class="remove" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="selectedToken"
      title="Xóa token"
      :visible.sync="removeDialogVisible"
      width="max-content"
    >
      <span>Bạn có chắc chắn muốn xóa token {{ selectedToken.token }}?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="removeDialogVisible = false">Hủy</el-button>
        <el-button
          type="danger"
          :loading="deleteLoading"
          @click="onRemoveTokenConfirm"
        >Xác nhận</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="tokenFormDialogTitle"
      :visible.sync="tokenFormDialogVisible"
      width="max-content"
      :close-on-click-modal="false"
      @open="tokenFormKey++"
      @close="onTokenFormDialogClose"
    >
      <TokenForm
        v-if="tokenFormData"
        :key="tokenFormKey"
        :form-prop="tokenFormData"
        @close-form="tokenFormDialogVisible = false"
        @saved="onTokenSaved"
      />
    </el-dialog>

  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { parseTime, createSuccessNotify } from '@/utils/common';
import { Token } from '@/types/token';
import { ACTION, FIELD } from '@/utils/constant';
import TokenForm from '@/components/TokenForm/index.vue';

@Component({
  components: { TokenForm }
})
export default class TokenTable extends Vue {
  @Prop(Array) readonly tokenList!: Token[];
  @Prop(Number) readonly fbAppId!: number;
  @Prop({ default: () => null }) readonly contactId!: number | null;
  removeDialogVisible: boolean = false;
  selectedToken: Token | null = null;
  tokenFormDialogVisible: boolean = false;
  tokenFormDialogTitle: string = '';
  tokenFormData: Token | null = null;
  tokenFormKey = 0;

  get deleteLoading() {
    return this.$store.state.firebaseApp.tokenLoading;
  }
  get customerId(): number {
    return Number(this.$route.params.customerId);
  }
  onEdit(token: Token) {
    this.tokenFormData = token;
    this.tokenFormDialogVisible = true;
    this.tokenFormDialogTitle = 'Sửa token'
  }
  onRemove(token: Token) {
    this.removeDialogVisible = true;
    this.selectedToken = token;
  }
  async onRemoveTokenConfirm() {
    await this.$store.dispatch('firebaseApp/deleteToken', { id: this.selectedToken!.id });
    createSuccessNotify(this, ACTION.DELETE, FIELD.TOKEN)
    this.removeDialogVisible = false;
    this.$emit('changed')
  }
  getTokenTimeStr(time: number) {
    return parseTime(new Date(time), '{d}/{m}/{Y} {H}:{i}:{s}')
  }
  onTokenSaved() {
    this.tokenFormDialogVisible = false;
    this.$emit('changed')
  }
  onCreate() {
    this.tokenFormData = this.initTokenForm();
    this.tokenFormDialogVisible = true;
    this.tokenFormDialogTitle = 'Thêm token'
  }
  initTokenForm(): Token {
    return {
      id: null,
      token: '',
      deviceName: '',
      fbAppId: this.fbAppId,
      contactId: this.contactId ? this.contactId : 0
    }
  }
  onTokenFormDialogClose() {
    this.tokenFormData = this.initTokenForm();
  }
}
</script>
<style lang="scss">
.token-table {
  .cell{
    font-weight: 400;
  }
}
</style>
