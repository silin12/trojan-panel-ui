<template>
  <div class="db-guard">
    <el-alert
      :title="$t('config.dbGuardTip')"
      type="warning"
      :closable="false"
      show-icon
    />

    <el-row :gutter="20" class="dg-status">
      <el-col :span="12">
        <div class="dg-card">
          <div class="dg-label">{{ $t('config.dbGuardMode') }}</div>
          <div class="dg-value">
            <el-tag v-if="status.mode === 'open'" type="danger" effect="dark">
              {{ $t('config.dbGuardOpen') }}
            </el-tag>
            <el-tag v-else type="success" effect="dark">
              {{ $t('config.dbGuardGuard') }}
            </el-tag>
            <span class="dg-hint">
              {{ status.mode === 'open' ? $t('config.dbGuardOpenHint') : $t('config.dbGuardGuardHint') }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="dg-card">
          <div class="dg-label">{{ $t('config.dbGuardPorts') }}</div>
          <div class="dg-value">
            <el-tag
              v-for="(v, k) in status.listening"
              :key="k"
              :type="v ? 'success' : 'info'"
              class="dg-port"
            >
              {{ k }} {{ v ? 'LISTEN' : 'DOWN' }}
            </el-tag>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="dg-actions">
      <el-button type="primary" :loading="loading" @click="switchMode('open')">
        {{ $t('config.dbGuardOpen') }}
      </el-button>
      <el-button type="success" :loading="loading" @click="switchMode('guard')">
        {{ $t('config.dbGuardGuard') }}
      </el-button>
      <el-button icon="el-icon-refresh" @click="load">{{ $t('config.dbGuardRefresh') }}</el-button>
    </div>

    <div class="dg-allow">
      <div class="dg-label">{{ $t('config.dbGuardAllow') }}</div>
      <div class="dg-add">
        <el-input
          v-model="newIp"
          :placeholder="$t('config.dbGuardAllowAdd')"
          style="width: 320px"
          clearable
          @keyup.enter.native="addIp"
        />
        <el-button type="primary" plain :loading="loading" @click="addIp">
          {{ $t('config.dbGuardAdd') }}
        </el-button>
      </div>
      <el-table :data="allowRows" size="mini" border style="width: 100%">
        <el-table-column prop="ip" :label="$t('config.dbGuardAllow')" />
        <el-table-column prop="family" label="IPv" width="90" />
        <el-table-column :label="$t('config.dbGuardAction')" width="110">
          <template slot-scope="scope">
            <el-button type="text" style="color: #f56c6c" @click="removeIp(scope.row.ip)">
              {{ $t('config.dbGuardRemove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="dg-hint">{{ $t('config.dbGuardAllowHint') }}</div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

function api(path, options) {
  const opt = options || {}
  return fetch('/dbguard/' + path, {
    method: opt.method || 'GET',
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'application/json'
    },
    body: opt.body ? JSON.stringify(opt.body) : undefined
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      if (data.code !== 200) throw new Error(data.msg || 'request failed')
      return data.data
    })
}

export default {
  name: 'dbGuard',
  data() {
    return {
      loading: false,
      newIp: '',
      status: { mode: 'guard', listening: {}, allow4: [], allow6: [] }
    }
  },
  computed: {
    allowRows() {
      const rows = []
      ;(this.status.allow4 || []).forEach(function (ip) {
        rows.push({ ip: ip, family: 4 })
      })
      ;(this.status.allow6 || []).forEach(function (ip) {
        rows.push({ ip: ip, family: 6 })
      })
      return rows
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      const vm = this
      api('status')
        .then(function (data) {
          vm.status = data
        })
        .catch(function (err) {
          vm.$message.error(err.message)
        })
    },
    switchMode(mode) {
      const vm = this
      const isOpen = mode === 'open'
      const confirmText = isOpen
        ? vm.$t('config.dbGuardOpenConfirm')
        : vm.$t('config.dbGuardGuardConfirm')
      vm.$confirm(confirmText, vm.$t('config.dbGuard'), {
        confirmButtonText: vm.$t('config.dbGuardOk'),
        cancelButtonText: vm.$t('config.dbGuardCancel'),
        type: 'warning'
      })
        .then(function () {
          vm.loading = true
          api('mode', { method: 'POST', body: { mode: mode } })
            .then(function (data) {
              vm.status = data
              vm.$message.success(vm.$t('config.dbGuardDone'))
            })
            .catch(function (err) {
              vm.$message.error(err.message)
            })
            .finally(function () {
              vm.loading = false
            })
        })
        .catch(function () {})
    },
    addIp() {
      const vm = this
      const ip = (vm.newIp || '').trim()
      if (!ip) return
      vm.loading = true
      api('allow', { method: 'POST', body: { ip: ip } })
        .then(function (data) {
          vm.status = data
          vm.newIp = ''
          vm.$message.success(vm.$t('config.dbGuardDone'))
        })
        .catch(function (err) {
          vm.$message.error(err.message)
        })
        .finally(function () {
          vm.loading = false
        })
    },
    removeIp(ip) {
      const vm = this
      vm.loading = true
      api('deny', { method: 'POST', body: { ip: ip } })
        .then(function (data) {
          vm.status = data
          vm.$message.success(vm.$t('config.dbGuardDone'))
        })
        .catch(function (err) {
          vm.$message.error(err.message)
        })
        .finally(function () {
          vm.loading = false
        })
    }
  }
}
</script>

<style scoped>
.db-guard {
  padding-top: 6px;
}
.dg-status {
  margin-top: 16px;
}
.dg-card {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 14px 16px;
  background: #fff;
}
.dg-label {
  font-size: 13px;
  color: #909399;
  margin-bottom: 10px;
}
.dg-value {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.dg-port {
  margin-right: 8px;
}
.dg-hint {
  font-size: 12px;
  color: #909399;
  margin-left: 10px;
}
.dg-actions {
  margin: 18px 0 6px;
}
.dg-allow {
  margin-top: 10px;
}
.dg-add {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
</style>
