<script lang="ts" setup>
import { h, onMounted, ref } from 'vue'
// import { useRouter } from 'vue-router'
import type { DataTableColumns, FormInst } from 'naive-ui'
import { NButton, useMessage, useDialog } from 'naive-ui'
import axios from 'axios'
import {
  deviceOptions,
  createStreamUrlList,
  ORIGIN_TYPE,
  originOptions,
} from './constants'
import { M3u8Play } from '@gomk/components'
import { apiRequest } from '@/bridge'
import { formatDateTime } from '@gomk/utils'

const NcInfo = {
  tableName: 'camera_info',
  projectName: '系统内置',
}

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

const tableData = ref<RowData[]>([])
const listTableData = ref<ListRowData[]>([])
const loading = ref(false)
const addVisible = ref(false)
const showModal = ref(false)
const showListModal = ref(false)
const currentListStreamName = ref('')
const previewUrl = ref('')
const formRef = ref<FormInst | null>(null)
const model = ref({
  device: undefined,
  username: undefined,
  password: undefined,
  port: undefined,
  ip: undefined,
  disableAudio: undefined,
  remark: undefined,
  origin_type: ORIGIN_TYPE.URL,
  origin_url: undefined,
})
// const rules = shallowRef({
//   device: {
//     required: true,
//     trigger: ['blur', 'input'],
//     message: '请选择',
//   },
//   username: {
//     required: true,
//     trigger: ['blur', 'input'],
//     message: '请输入用户名',
//   },
//   password: {
//     required: true,
//     trigger: ['blur', 'input'],
//     message: '请输入密码',
//   },
//   port: {
//     required: true,
//     trigger: ['blur', 'input'],
//     message: '请输入端口',
//   },
//   ip: {
//     required: true,
//     trigger: ['blur', 'input'],
//     message: '请输入IP',
//   },
// })

// const urlRules = shallowRef({
//   origin_url: {
//     required: true,
//     trigger: ['blur', 'input'],
//     message: '请选择',
//   },
// })

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

const isUrlType = $computed(() => {
  return model.value.origin_type === ORIGIN_TYPE.URL
})

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
      title: 'ID',
      key: 'Id',
    },
    {
      title: '源类型',
      key: 'origin_type_text',
    },
    {
      title: '源地址',
      key: 'origin_url',
    },
    // {
    //   title: '应用名',
    //   key: 'app_name',
    // },
    {
      title: '监控名称',
      key: 'stream_name',
    },
    // {
    //   title: '视频编码',
    //   key: 'video_codec',
    // },
    // {
    //   title: '音频编码',
    //   key: 'audio_codec',
    // },
    {
      title: '源IP',
      key: 'remote_addr',
    },
    // {
    //   title: '源协议',
    //   key: 'protocol',
    // },
    {
      title: '创建时间',
      key: 'createAt',
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
    // if (isUrlType) {
    //   previewUrl.value = `http://localhost:8080/hls/${row.stream_name}.m3u8`
    // } else {
    previewUrl.value = `http://localhost:8080/hls/${row.stream_name}.m3u8`
    // }
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
    const { list = [] } = await apiRequest.getRows(NcInfo)

    // const { data } = await axiosInstance.get('/api/stat/all_group')
    // const { data: { groups = [] } = {} } = data
    tableData.value =
      list.map((item) => {
        const originType = item?.origin_type ?? ORIGIN_TYPE.URL
        return {
          ...item,
          origin_type_text: originType === ORIGIN_TYPE.URL ? 'URL' : '摄像头',
          createAt: formatDateTime(item.CreatedAt),
        }
      }) || []
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
    origin_type: ORIGIN_TYPE.URL,
    origin_url: undefined,
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
  const url = isUrlType
    ? model.value.origin_url
    : `rtsp://${model.value.username}:${model.value.password}@${model.value.ip}:${model.value.port}/Streaming/Channels/101`

  try {
    const { data } = await axiosInstance.post('/api/ctrl/start_relay_pull', {
      url,
    })
    const { error_code, data: res } = data
    const { stream_name, session_id } = res
    if (error_code === 0) {
      message.success(
        `添加成功:stream_name=${stream_name} session_id=${session_id}`,
      )
    }
    await apiRequest.insert(NcInfo, {
      stream_name,
      session_id,
      remark: model.value.remark,
      origin_type: model.value.origin_type,
      origin_url: model.value.origin_url,
      remote_addt: `${model.value.ip}:${model.value.port}`,
    })

    await fetchList()
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
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="源类型" path="origin_type">
          <n-select
            v-model:value="model.origin_type"
            placeholder="请选择源类型"
            :options="originOptions"
          />
        </n-form-item>
        <template v-if="isUrlType">
          <n-form-item label="源地址" path="origin_url">
            <n-input
              v-model:value="model.origin_url"
              placeholder="请输入源地址"
            />
          </n-form-item>
        </template>

        <template v-else>
          <n-form-item label="设备" path="device">
            <n-select
              v-model:value="model.device"
              placeholder="请选择设备"
              :options="deviceOptions"
            />
          </n-form-item>

          <n-form-item label="用户名" path="username">
            <n-input
              v-model:value="model.username"
              placeholder="请输入用户名"
            />
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
        </template>
      </n-form>
      <template #footer>
        <n-button class="mr-2" @click="cancelAdd">取消</n-button>
        <n-button type="primary" @click="submitAdd">确认</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
