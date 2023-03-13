<script lang="ts" setup>
import { h, onMounted, shallowRef } from 'vue'
// import { useRouter } from 'vue-router'
import type { DataTableColumns, FormInst } from 'naive-ui'
import { NButton, useMessage, useDialog } from 'naive-ui'
import axios from 'axios'
import { deviceOptions, createStreamUrlList } from './constants'
import { M3u8Play } from '@gomk/components'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_LAL_HOST,
  withCredentials: false,
  responseType: 'json',
})

interface PullOrPubInfo {
  base_type: string
  bitrate_kbits: number
  protocol: string
  read_bitrate_kbits: number
  read_bytes_sum: number
  remote_addr: string
  session_id: string
  start_time: string
  write_bitrate_kbits: number
  wrote_bytes_sum: number
}

type RowData = {
  app_name: string
  stream_name: string
  video_codec: string
  video_height: string
  video_width: string
  audio_codec: string
  pull?: PullOrPubInfo
}

type ListRowData = {
  name: string
  url?: string
}

const tableData = shallowRef<RowData[]>([])
const listTableData = shallowRef<ListRowData[]>([])
const loading = shallowRef(false)
const addVisible = shallowRef(false)
const showModal = shallowRef(false)
const showListModal = shallowRef(false)
const currentListStreamName = shallowRef('')
const previewUrl = shallowRef('')
const formRef = shallowRef<FormInst | null>(null)
const model = shallowRef({
  device: undefined,
  username: undefined,
  password: undefined,
  port: undefined,
  ip: undefined,
  disableAudio: undefined,
  remark: undefined,
})
const rules = shallowRef({
  device: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择',
  },
  username: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入用户名',
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入密码',
  },
  port: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入端口',
  },
  ip: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入IP',
  },
})

const message = useMessage()
const dialog = useDialog()

const createListColumns = () => {
  return [
    {
      title: '名称',
      key: 'name',
    },
    {
      title: '地址',
      key: 'url',
    },
  ]
}

const createColumns = ({
  close,
  list,
  preview,
}: {
  list: (row: RowData) => void
  close: (row: RowData) => void
  preview: (row: RowData) => void
}): DataTableColumns<RowData> => {
  return [
    {
      title: '应用名',
      key: 'app_name',
    },
    {
      title: '监控名称',
      key: 'stream_name',
    },
    {
      title: '视频编码',
      key: 'video_codec',
    },
    {
      title: '音频编码',
      key: 'audio_codec',
    },
    {
      title: '源IP',
      key: 'pull.remote_addr',
    },
    {
      title: '源协议',
      key: 'pull.protocol',
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h('div', [
          h(
            NButton,
            {
              onClick: () => list(row),
            },
            { default: () => '播流地址' },
          ),
          h(
            NButton,
            {
              class: 'mx-2',
              type: 'primary',
              onClick: () => preview(row),
            },
            { default: () => '预览' },
          ),
          h(
            NButton,
            {
              type: 'error',
              onClick: () => close(row),
            },
            { default: () => '关闭' },
          ),
        ])
      },
    },
  ]
}

const columns = createColumns({
  close: doClose,
  preview(row: RowData) {
    previewUrl.value = `http://127.0.0.1:8080/hls/${row.stream_name}.m3u8`
    showModal.value = true
  },
  list(row: RowData) {
    currentListStreamName.value = row.stream_name
    showListModal.value = true
    listTableData.value = createStreamUrlList('localhost', row.stream_name)
  },
})
const listColumns = createListColumns()

async function fetchList() {
  try {
    loading.value = true
    const { data } = await axiosInstance.get('/api/stat/all_group')
    const { data: { groups = [] } = {} } = data
    tableData.value = groups || []
  } catch (error) {
    message.error('获取监控列表失败！')
  } finally {
    loading.value = false
  }
}

async function doClose(row: RowData) {
  dialog.info({
    title: '确认是否关闭弹窗',
    content: '关闭后将不能查看监控视频',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        loading.value = true
        const { stream_name } = row
        const { data } = await axiosInstance.get(
          `/api/ctrl/stop_relay_pull?stream_name=${stream_name}`,
        )
        const { error_code } = data
        if (error_code !== 0) {
          throw error_code
        }
        setTimeout(() => {
          fetchList()
        }, 1000)
        message.success('操作成功！')
      } catch (error) {
        message.error('操作失败！')
      } finally {
        loading.value = false
      }
    },
    // onNegativeClick: () => {
    //   message.error('不确定')
    // },
  })
}

async function beforeAdd() {
  model.value = {
    device: undefined,
    username: undefined,
    password: undefined,
    port: undefined,
    ip: undefined,
    disableAudio: undefined,
    remark: undefined,
  }
  addVisible.value = true
}

function cancelAdd() {
  addVisible.value = false
}

function submitAdd(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await doAdd()
      addVisible.value = false
    }
  })
}
async function doAdd() {
  const url = `rtsp://${model.value.username}:${model.value.password}@${model.value.ip}:${model.value.port}/Streaming/Channels/101`

  try {
    const { data } = await axiosInstance.post('/api/ctrl/start_relay_pull', {
      url,
    })
    const { error_code, data: res } = data
    if (error_code === 0) {
      const { stream_name, session_id } = res
      message.success(
        `添加成功:stream_name=${stream_name} session_id=${session_id}`,
      )
    }
    setTimeout(() => {
      fetchList()
    }, 1000)
  } catch (error: any) {
    message.error('添加失败:' + error.toString())
  }
}

onMounted(async () => {
  await fetchList()
})
</script>

<template>
  <n-button class="mb-2" type="primary" @click="beforeAdd">添加监控</n-button>
  <n-data-table
    :loading="loading"
    :columns="columns"
    :data="tableData"
    :pagination="false"
    :bordered="false"
  />

  <n-modal
    v-model:show="showModal"
    style="width: auto"
    preset="dialog"
    title="监控预览"
  >
    <M3u8Play :url="previewUrl" />
  </n-modal>

  <n-modal
    v-model:show="showListModal"
    style="width: auto"
    preset="dialog"
    title="播流地址"
  >
    <n-data-table
      :columns="listColumns"
      :data="listTableData"
      :pagination="false"
      :bordered="false"
    />
  </n-modal>

  <n-drawer v-model:show="addVisible" :width="502" placement="right">
    <n-drawer-content title="添加摄像头">
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="设备" path="device">
          <n-select
            v-model:value="model.device"
            placeholder="请选择设备"
            :options="deviceOptions"
          />
        </n-form-item>

        <n-form-item label="用户名" path="username">
          <n-input v-model:value="model.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="model.password"
            type="password"
            placeholder="请输入密码"
          />
        </n-form-item>
        <n-form-item label="IP" path="ip">
          <n-input v-model:value="model.ip" placeholder="请输入IP" />
        </n-form-item>
        <n-form-item label="端口" path="port">
          <n-input v-model:value="model.port" placeholder="请输入端口" />
        </n-form-item>
        <!-- <n-form-item label="禁用音频" path="disableAudio">
          <n-checkbox v-model:value="model.disableAudio" />
        </n-form-item> -->
        <n-form-item label="备注" path="remark">
          <n-input
            v-model:value="model.remark"
            type="textarea"
            placeholder="备注"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button class="mr-2" @click="cancelAdd">取消</n-button>
        <n-button type="primary" @click="submitAdd">确认</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
