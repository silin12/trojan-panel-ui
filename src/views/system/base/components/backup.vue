<template>
  <div class="tp-backup">
    <el-alert :title="$t('config.backupTip')" type="info" :closable="false" show-icon />

    <el-row :gutter="16" class="tb-grid">
      <el-col :xs="24" :md="24" :lg="13">
        <!-- 备份策略 -->
        <el-card shadow="never" class="tb-sec">
          <div slot="header" class="tb-sec-head">
            <span class="tb-sec-title">{{ $t('config.backupSecPolicy') }}</span>
            <div class="tb-sec-ops">
              <el-button size="mini" icon="el-icon-refresh" @click="load">{{ $t('config.backupRefresh') }}</el-button>
              <el-button size="mini" type="warning" :loading="running" @click="runNow">{{ $t('config.backupRun') }}</el-button>
              <el-button size="mini" type="primary" :loading="saving" @click="save">{{ $t('config.backupSave') }}</el-button>
            </div>
          </div>

          <div class="tb-summary">
            <span v-if="status.lastResult">
              <el-tag :type="status.lastResult === 'ok' ? 'success' : 'danger'" effect="plain" size="mini">
                {{ status.lastResult === 'ok' ? $t('config.backupOk') : $t('config.backupError') }}
              </el-tag>
            </span>
            <span>{{ $t('config.backupLast') }}：{{ status.lastRun || $t('config.backupNone') }}</span>
            <span class="tb-sep">|</span>
            <span>{{ $t('config.backupNext') }}：{{ status.nextRun || $t('config.backupNone') }}</span>
            <span v-if="status.lastMsg" class="tb-sep">|</span>
            <span v-if="status.lastMsg">{{ status.lastMsg }}</span>
          </div>

          <el-form :label-width="isNarrow ? '96px' : '120px'" size="small" class="tb-form">
            <el-row :gutter="16">
              <el-col :xs="24" :sm="8">
                <el-form-item :label="$t('config.backupEnable')">
                  <el-switch v-model="form.enabled" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <el-form-item :label="$t('config.backupTime')">
                  <el-time-select
                    v-model="form.schedule"
                    :picker-options="{ start: '00:00', step: '00:30', end: '23:30' }"
                    size="small"
                    style="width: 130px"
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="8">
                <el-form-item :label="$t('config.backupRetention')">
                  <el-input-number
                    v-model="form.retention"
                    :min="1"
                    :max="30"
                    size="small"
                    controls-position="right"
                    style="width: 110px"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="tb-hintline">{{ $t('config.backupTimeHint') }} · {{ $t('config.backupRetentionHint') }}</div>

            <el-divider content-position="left">{{ $t('config.backupMail') }}</el-divider>

            <el-form-item :label="$t('config.backupMailEnable')">
              <el-switch v-model="form.emailEnabled" />
              <el-button
                v-if="form.emailEnabled"
                size="mini"
                :loading="testing"
                style="margin-left: 12px"
                @click="testMail"
              >
                {{ $t('config.backupTestMail') }}
              </el-button>
            </el-form-item>

            <template v-if="form.emailEnabled">
              <el-row :gutter="16">
                <el-col :xs="24" :sm="14">
                  <el-form-item :label="$t('config.backupSmtpHost')">
                    <el-input v-model="form.smtpHost" placeholder="smtp.qq.com" size="small" style="width: 220px" clearable />
                    <el-input-number
                      v-model="form.smtpPort"
                      :min="1"
                      :max="65535"
                      :controls="false"
                      size="small"
                      style="width: 80px; margin-left: 8px"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10">
                  <el-form-item :label="$t('config.backupSmtpUser')">
                    <el-input v-model="form.smtpUser" placeholder="you@qq.com" size="small" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="16">
                <el-col :xs="24" :sm="14">
                  <el-form-item :label="$t('config.backupSmtpPass')">
                    <el-input
                      v-model="form.smtpPass"
                      show-password
                      size="small"
                      :placeholder="status.hasSmtpPass ? $t('config.backupSmtpPassSaved') : ''"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="10">
                  <el-form-item :label="$t('config.backupSmtpTo')">
                    <el-input v-model="form.smtpTo" placeholder="you@qq.com" size="small" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </el-form>
        </el-card>

        <!-- 反向拉取 -->
        <el-card shadow="never" class="tb-sec">
          <div slot="header" class="tb-sec-head">
            <span class="tb-sec-title">{{ $t('config.backupSecPull') }}</span>
            <div class="tb-sec-ops">
              <span class="tb-hint-inline">{{ form.pullEnabled ? $t('config.backupPullOn') : $t('config.backupPullOff') }}</span>
              <el-switch v-model="form.pullEnabled" :loading="saving" @change="savePull" />
            </div>
          </div>
          <div class="tb-sec-desc">{{ $t('config.backupPullTip') }}</div>
          <el-form :label-width="isNarrow ? '96px' : '120px'" size="small" class="tb-form">
            <el-form-item :label="$t('config.backupPullToken')">
              <el-input :value="form.pullEnabled ? status.pullToken : ''" readonly size="small" class="tb-pull-input"
                :placeholder="form.pullEnabled ? '' : $t('config.backupPullDisabledHint')">
                <el-button slot="append" size="mini" :disabled="!form.pullEnabled" @click="copyToken">{{ $t('config.backupCopy') }}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('config.backupPullUrl')">
              <el-input :value="form.pullEnabled ? pullUrl : ''" readonly size="small" class="tb-pull-input"
                :placeholder="form.pullEnabled ? '' : $t('config.backupPullDisabledHint')">
                <el-button slot="append" size="mini" :disabled="!form.pullEnabled" @click="copyUrl">{{ $t('config.backupCopy') }}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item v-if="form.pullEnabled">
              <el-button size="mini" type="danger" plain @click="resetToken">{{ $t('config.backupPullReset') }}</el-button>
              <span class="tb-hintline-inline">{{ $t('config.backupPullResetHint') }}</span>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 本机备份文件 -->
        <el-card shadow="never" class="tb-sec">
          <div slot="header" class="tb-sec-head">
            <span class="tb-sec-title">{{ $t('config.backupSecFiles') }}</span>
          </div>
          <el-table :data="status.items" size="small" stripe class="tb-table">
            <el-table-column prop="time" :label="$t('config.backupTime')" width="160" />
            <el-table-column prop="name" label="File" show-overflow-tooltip />
            <el-table-column :label="$t('config.backupSize')" width="100">
              <template slot-scope="scope">{{ fmtSize(scope.row.size) }}</template>
            </el-table-column>
            <el-table-column :label="$t('config.backupOps')" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="download(scope.row.name)">
                  {{ $t('config.backupDownload') }}
                </el-button>
                <el-button type="text" size="mini" class="tb-btn-warn" @click="restoreLocal(scope.row.name, 'overwrite')">
                  {{ $t('config.backupRestore') }}
                </el-button>
                <el-button type="text" size="mini" @click="restoreLocal(scope.row.name, 'merge')">
                  {{ $t('config.backupMerge') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="!(status.items && status.items.length)" class="tb-empty">
            {{ $t('config.backupEmpty') }}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="24" :lg="11">
        <!-- 恢复 -->
        <el-card shadow="never" class="tb-sec">
          <div slot="header" class="tb-sec-head">
            <span class="tb-sec-title">{{ $t('config.backupRestoreTitle') }}</span>
          </div>
          <el-alert
            :title="$t('config.backupRestoreTip')"
            type="warning"
            :closable="false"
            show-icon
            class="tb-alert"
          />
          <el-form :label-width="isNarrow ? '96px' : '120px'" size="small" class="tb-form">
            <el-form-item :label="$t('config.backupRestoreMode')">
              <el-radio-group v-model="restoreMode">
                <el-radio label="overwrite">{{ $t('config.backupRestoreModeOverwrite') }}</el-radio>
                <el-radio label="merge">{{ $t('config.backupRestoreModeMerge') }}</el-radio>
              </el-radio-group>
              <div class="tb-hintline">{{ $t('config.backupRestoreModeTip') }}</div>
            </el-form-item>
            <el-form-item :label="$t('config.backupRestoreFrom')">
              <div class="tb-restore-row">
                <el-upload
                  action="#"
                  :auto-upload="false"
                  :limit="1"
                  accept=".tar.gz,.gz"
                  :on-change="pickRestoreFile"
                  :on-remove="clearRestoreFile"
                  class="tb-upload"
                >
                  <el-button size="small" icon="el-icon-folder-opened">
                    {{ $t('config.backupRestorePick') }}
                  </el-button>
                </el-upload>
                <span v-if="restoreFileName" class="tb-file">{{ restoreFileName }}</span>
                <el-button
                  :type="restoreMode === 'merge' ? 'primary' : 'danger'"
                  :disabled="!restoreRaw"
                  :loading="restoring"
                  size="small"
                  @click="restoreUpload"
                >
                  {{ restoreMode === 'merge' ? $t('config.backupMergeRun') : $t('config.backupRestoreRun') }}
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
    </el-form>

    <div class="tb-actions">
      <el-button v-if="form.davEnabled" :loading="testingDav" @click="testDav">
        {{ $t('config.backupTestDav') }}
      </el-button>
      <el-button v-if="form.emailEnabled" :loading="testing" @click="testMail">
        {{ $t('config.backupTestMail') }}
      </el-button>
      <el-button type="primary" :loading="saving" @click="save">{{ $t('config.backupSave') }}</el-button>
      <el-button type="warning" :loading="running" @click="runNow">{{ $t('config.backupRun') }}</el-button>
      <el-button icon="el-icon-refresh" @click="load">{{ $t('config.backupRefresh') }}</el-button>
    </div>

    <div class="tb-list">
      <div class="tb-label">{{ $t('config.backupLocal') }}（{{ status.total || 0 }}）</div>
      <el-table :data="status.items" size="mini" border>
        <el-table-column prop="time" :label="$t('config.backupTime')" width="150" />
        <el-table-column prop="name" label="File" />
        <el-table-column :label="$t('config.backupSize')" width="100">
          <template slot-scope="scope">{{ fmtSize(scope.row.size) }}</template>
        </el-table-column>
        <el-table-column :label="$t('config.backupDownload')" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="download(scope.row.name)">
              {{ $t('config.backupDownload') }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('config.backupRestore')" width="130">
          <template slot-scope="scope">
            <el-button type="text" style="color: #e6a23c" @click="restoreLocal(scope.row.name, 'overwrite')">
              {{ $t('config.backupRestore') }}
            </el-button>
            <el-button type="text" @click="restoreLocal(scope.row.name, 'merge')">
              {{ $t('config.backupMerge') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="!(status.items && status.items.length)" class="tb-empty">
        {{ $t('config.backupEmpty') }}
      </div>
    </div>

    <el-divider content-position="left">{{ $t('config.backupRestoreTitle') }}</el-divider>
    <el-alert
      :title="$t('config.backupRestoreTip')"
      type="warning"
      :closable="false"
      show-icon
      style="margin-bottom: 12px"
    />
    <el-form label-width="110px" style="margin-bottom: 12px">
      <el-form-item :label="$t('config.backupRestoreMode')">
        <el-radio-group v-model="restoreMode">
          <el-radio label="overwrite">{{ $t('config.backupRestoreModeOverwrite') }}</el-radio>
          <el-radio label="merge">{{ $t('config.backupRestoreModeMerge') }}</el-radio>
        </el-radio-group>
        <div class="tb-hint" style="margin-top: 4px">{{ $t('config.backupRestoreModeTip') }}</div>
      </el-form-item>
    </el-form>
    <div class="tb-actions">
      <el-upload
        ref="upload"
        action="#"
        :auto-upload="false"
        :limit="1"
        accept=".tar.gz,.gz"
        :on-change="pickRestoreFile"
        :on-remove="clearRestoreFile"
        style="display: inline-block; margin-right: 10px"
      >
        <el-button size="small" icon="el-icon-folder-opened">
          {{ $t('config.backupRestorePick') }}
        </el-button>
      </el-upload>
      <el-button
        :type="restoreMode === 'merge' ? 'primary' : 'danger'"
        :disabled="!restoreRaw"
        :loading="restoring"
        @click="restoreUpload"
      >
        {{ restoreMode === 'merge' ? $t('config.backupMergeRun') : $t('config.backupRestoreRun') }}
      </el-button>
      <span v-if="restoreFileName" class="tb-hint" style="margin-left: 10px">{{ restoreFileName }}</span>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

function api(path, options) {
  const opt = options || {}
  return fetch('/backup/' + path, {
    method: opt.method || 'GET',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    body: opt.body ? JSON.stringify(opt.body) : undefined
  })
    .then(function (res) { return res.json() })
    .then(function (data) {
      if (data.code !== 200) throw new Error(data.msg || 'request failed')
      return data
    })
}

export default {
  name: 'tpBackup',
  data() {
    return {
      saving: false,
      restoring: false,
      restoreMode: 'overwrite',
      restoreRaw: null,
      restoreFileName: '',
      testing: false,
      testingDav: false,
      running: false,
      isNarrow: window.innerWidth < 768,
      status: {
        enabled: true,
        hasSmtpPass: false,
        hasDavPass: false,
        lastRun: '',
        lastResult: '',
        lastMsg: '',
        nextRun: '',
        items: [],
        total: 0
      },
      form: {
        enabled: true,
        schedule: '03:30',
        retention: 2,
        pullEnabled: true,
        davEnabled: false,
        davUrl: '',
        davUser: '',
        davPass: '',
        davDir: 'tp-backup',
        emailEnabled: false,
        smtpHost: '',
        smtpPort: 465,
        smtpUser: '',
        smtpPass: '',
        smtpTo: ''
      }
    }
  },
  computed: {
    pullUrl() {
      const host = window.location.host
      return window.location.protocol + '//' + host + '/backup-pull/latest?token=' + (this.status.pullToken || '')
    }
  },
  created() {
    this.load()
  },
  methods: {
    fmtSize(n) {
      if (!n) return '0 B'
      if (n < 1024) return n + ' B'
      return (n / 1024).toFixed(1) + ' KB'
    },
    load() {
      const vm = this
      api('status')
        .then(function (res) {
          vm.status = res.data
          vm.fillForm(res.data)
        })
        .catch(function (err) { vm.$message.error(err.message) })
    },
    fillForm(data) {
      this.form.enabled = !!data.enabled
      this.form.schedule = data.schedule || '03:30'
      this.form.retention = data.retention || 2
      this.form.pullEnabled = data.pullEnabled === undefined ? true : !!data.pullEnabled
      this.form.davEnabled = !!data.davEnabled
      this.form.davUrl = data.davUrl || ''
      this.form.davUser = data.davUser || ''
      this.form.davDir = data.davDir || 'tp-backup'
      this.form.emailEnabled = !!data.emailEnabled
      this.form.smtpHost = data.smtpHost || ''
      this.form.smtpPort = data.smtpPort || 465
      this.form.smtpUser = data.smtpUser || ''
      this.form.smtpTo = data.smtpTo || ''
    },
    payload(includeSecret) {
      const p = {
        enabled: this.form.enabled,
        schedule: this.form.schedule,
        retention: this.form.retention,
        pullEnabled: this.form.pullEnabled,
        davEnabled: this.form.davEnabled,
        davUrl: this.form.davUrl,
        davUser: this.form.davUser,
        davDir: this.form.davDir,
        emailEnabled: this.form.emailEnabled,
        smtpHost: this.form.smtpHost,
        smtpPort: this.form.smtpPort,
        smtpUser: this.form.smtpUser,
        smtpTo: this.form.smtpTo
      }
      if (includeSecret && this.form.davPass) p.davPass = this.form.davPass
      if (includeSecret && this.form.smtpPass) p.smtpPass = this.form.smtpPass
      return p
    },
    save() {
      const vm = this
      vm.saving = true
      api('config', { method: 'POST', body: vm.payload(true) })
        .then(function (res) {
          vm.status = res.data
          vm.form.smtpPass = ''
          vm.form.davPass = ''
          vm.$message.success(res.msg || vm.$t('config.backupDone'))
        })
        .catch(function (err) { vm.$message.error(err.message) })
        .finally(function () { vm.saving = false })
    },
    savePull() {
      const vm = this
      vm.saving = true
      api('config', { method: 'POST', body: vm.payload(true) })
        .then(function (res) {
          vm.status = res.data
          vm.$message.success(vm.form.pullEnabled ? vm.$t('config.backupPullOnMsg') : vm.$t('config.backupPullOffMsg'))
        })
        .catch(function (err) {
          vm.form.pullEnabled = !vm.form.pullEnabled
          vm.$message.error(err.message)
        })
        .finally(function () { vm.saving = false })
    },
    testMail() {
      const vm = this
      vm.testing = true
      api('test-email', { method: 'POST', body: vm.payload(true) })
        .then(function (res) { vm.$message.success(res.msg) })
        .catch(function (err) { vm.$message.error(err.message) })
        .finally(function () { vm.testing = false })
    },
    testDav() {
      const vm = this
      vm.testingDav = true
      api('test-dav', { method: 'POST', body: vm.payload(true) })
        .then(function (res) { vm.$message.success(res.msg) })
        .catch(function (err) { vm.$message.error(err.message) })
        .finally(function () { vm.testingDav = false })
    },
    runNow() {
      const vm = this
      vm.$confirm(vm.$t('config.backupRunConfirm'), vm.$t('config.backup'), {
        confirmButtonText: vm.$t('config.backupOkBtn'),
        cancelButtonText: vm.$t('config.backupCancel'),
        type: 'warning'
      })
        .then(function () {
          vm.running = true
          api('run', { method: 'POST' })
            .then(function (res) {
              vm.status = res.data
              vm.fillForm(res.data)
              vm.$message.success(res.msg)
            })
            .catch(function (err) { vm.$message.error(err.message) })
            .finally(function () { vm.running = false })
        })
        .catch(function () {})
    },
    pickRestoreFile(file) {
      this.restoreRaw = file.raw
      this.restoreFileName = file.name
    },
    clearRestoreFile() {
      this.restoreRaw = null
      this.restoreFileName = ''
    },
    confirmRestore(label, run, mode) {
      const vm = this
      if (!mode) mode = this.restoreMode
      vm.$confirm(
        vm.$t(mode === 'merge' ? 'config.backupMergeConfirm' : 'config.backupRestoreConfirm') + ' ' + label,
        vm.$t(mode === 'merge' ? 'config.backupMerge' : 'config.backupRestoreTitle'),
        { confirmButtonText: vm.$t('config.backupOkBtn'), cancelButtonText: vm.$t('config.backupCancel'), type: 'warning' }
      ).then(run).catch(function () {})
    },
    restoreLocal(name, mode) {
      const vm = this
      this.confirmRestore(name, function () {
        vm.restoring = true
        api('restore-local', { method: 'POST', body: { name: name, mode: mode } })
          .then(function (res) { vm.afterRestore(res, mode) })
          .catch(function (err) { vm.$message.error(err.message) })
          .finally(function () { vm.restoring = false })
      })
    },
    restoreUpload() {
      const vm = this
      const raw = this.restoreRaw
      const name = this.restoreFileName
      if (!raw) return
      this.confirmRestore(name, function () {
        vm.restoring = true
        fetch('/backup/restore-upload' + (vm.restoreMode === 'merge' ? '?mode=merge' : ''), {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + getToken(),
            'Content-Type': 'application/gzip',
            'X-Filename': encodeURIComponent(name)
          },
          body: raw
        })
          .then(function (res) { return res.json() })
          .then(function (data) {
            if (data.code !== 200) throw new Error(data.msg || 'restore failed')
            vm.afterRestore(data, vm.restoreMode)
          })
          .catch(function (err) { vm.$message.error(err.message) })
          .finally(function () { vm.restoring = false })
      })
    },
    afterRestore(res, mode) {
      const vm = this
      if (mode === 'merge') {
        vm.$alert(res.msg || vm.$t('config.backupMergeDone'), vm.$t('config.backupMerge'), {
          confirmButtonText: vm.$t('config.backupOkBtn'),
          type: 'success'
        })
        return
      }
      if (res.data && res.data.items) {
        vm.status = res.data
        vm.fillForm(res.data)
      }
      vm.$message.success(res.msg || vm.$t('config.backupRestoreDone'))
      vm.$alert(vm.$t('config.backupRestoreDone'), vm.$t('config.backupRestoreTitle'), {
        confirmButtonText: vm.$t('config.backupOkBtn'),
        type: 'success'
      })
    },
    copyText(txt, okMsg) {
      const vm = this
      const done = function () { vm.$message.success(okMsg || vm.$t('config.backupCopied')) }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done).catch(function () {
          const ta = document.createElement('textarea')
          ta.value = txt
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          document.body.removeChild(ta)
          done()
        })
        return
      }
      const ta = document.createElement('textarea')
      ta.value = txt
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      done()
    },
    copyToken() {
      this.copyText(this.status.pullToken, this.$t('config.backupCopied'))
    },
    copyUrl() {
      this.copyText(this.pullUrl, this.$t('config.backupCopied'))
    },
    resetToken() {
      const vm = this
      vm.$confirm(vm.$t('config.backupPullResetConfirm'), vm.$t('config.backup'), {
        confirmButtonText: vm.$t('config.backupOkBtn'),
        cancelButtonText: vm.$t('config.backupCancel'),
        type: 'warning'
      })
        .then(function () {
          api('pull-token', { method: 'POST' })
            .then(function (res) {
              vm.status = res.data
              vm.$message.success(res.msg)
            })
            .catch(function (err) { vm.$message.error(err.message) })
        })
        .catch(function () {})
    },
    download(name) {
      const vm = this
      fetch('/backup/download?name=' + encodeURIComponent(name), {
        headers: { Authorization: 'Bearer ' + getToken() }
      })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status)
          return res.blob()
        })
        .then(function (blob) {
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = name
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
        })
        .catch(function (err) { vm.$message.error(err.message) })
    }
  }
}
</script>

<style scoped>
.tp-backup { padding-top: 4px; }

/* 概览 */
.tb-status { margin-top: 12px; }
.tb-card {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fafbfc;
  padding: 10px 14px;
  min-height: 62px;
  box-sizing: border-box;
}
.tb-card-label { font-size: 12px; color: #909399; margin-bottom: 6px; }
.tb-card-value { display: flex; align-items: center; flex-wrap: wrap; min-height: 22px; font-size: 13px; color: #303133; }
.tb-tag-gap { margin-left: 6px; }
.tb-mono { font-family: Menlo, Consolas, monospace; }
.tb-summary {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: -4px 0 12px;
  font-size: 12px;
  color: #909399;
}
.tb-sep { color: #dcdfe6; }
.tb-hint-inline { font-size: 12px; color: #909399; }
.tb-hintline-inline { margin-left: 8px; font-size: 12px; color: #a8abb2; }

/* 分区卡片 */
.tb-sec { margin-top: 12px; }
.tb-grid { margin-top: 12px; }
.tb-grid ::v-deep .el-col:first-child .tb-sec:first-child,
.tb-grid ::v-deep .el-col:last-child .tb-sec:first-child { margin-top: 0; }
.tb-grid ::v-deep .el-col { display: flex; flex-direction: column; }
.tb-sec:first-of-type { margin-top: 12px; }
.tb-sec ::v-deep .el-card__header { padding: 10px 16px; background: #fafbfc; }
.tb-sec ::v-deep .el-card__body { padding: 14px 16px 6px; }
.tb-sec-head { display: flex; align-items: center; justify-content: space-between; }
.tb-sec-title { font-size: 14px; font-weight: 600; color: #303133; }
.tb-count {
  display: inline-block;
  margin-left: 6px;
  padding: 0 6px;
  border-radius: 8px;
  background: #eef2f7;
  color: #606266;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}
.tb-sec-ops { display: flex; align-items: center; gap: 6px; }
.tb-sec-desc { margin-bottom: 10px; font-size: 12px; color: #909399; line-height: 1.7; }

/* 表单 */
.tb-form { margin-top: 2px; }
.tb-form ::v-deep .el-form-item { margin-bottom: 14px; }
.tb-hintline { margin: -6px 0 10px 0; font-size: 12px; color: #a8abb2; line-height: 1.7; }
.tb-pull-input { max-width: 700px; }

/* 列表 */
.tb-table { width: 100%; }
.tb-btn-warn { color: #e6a23c !important; }
.tb-empty { font-size: 12px; color: #909399; padding: 14px 0; }

/* 恢复 */
.tb-alert { margin-bottom: 14px; }
.tb-restore-row { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
.tb-upload ::v-deep .el-upload-list { display: none; }
.tb-file { font-size: 12px; color: #606266; word-break: break-all; max-width: 420px; }
</style>
