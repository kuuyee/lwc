export const deviceOptions: {
  label: string
  value: string
}[] = [
  {
    label: '海康威视',
    value: '海康威视',
  },
]

export enum ORIGIN_TYPE {
  URL,
  CAMERA,
}

export const originOptions: {
  label: string
  value: number
}[] = [
  {
    label: 'URL',
    value: ORIGIN_TYPE.URL,
  },
  {
    label: '摄像头',
    value: ORIGIN_TYPE.CAMERA,
  },
]

export function createStreamUrlList(host: string, streamName: string) {
  return [
    {
      name: 'RTMP',
      url: `rtmp://${host}:1935/live/${streamName}`,
    },
    {
      name: 'RTSP',
      url: `rtsp://${host}:5544/live/${streamName}`,
    },
    {
      name: 'HTTP-FLV',
      url: `http://${host}:8080/live/${streamName}.flv`,
    },
    {
      name: 'HTTP-FLV（https）',
      url: `https://${host}:4433/live/${streamName}.flv`,
    },
    {
      name: 'WebSocket-FLV',
      url: `ws://${host}:8080/live/${streamName}.flv`,
    },
    {
      name: 'WebSocket-FLV（websockets）',
      url: `wss://${host}:4433/live/${streamName}.flv`,
    },
    {
      name: 'HLS',
      url: `http://${host}:8080/hls/${streamName}.m3u8`,
    },
    {
      name: 'HLS（2）',
      url: `http://${host}:8080/hls/${streamName}.m3u8`,
    },
    {
      name: 'HTTP-TS',
      url: `http://${host}:8080/live/${streamName}.ts`,
    },
    {
      name: 'HTTP-TS（https）',
      url: `https://${host}:4433/live/${streamName}.ts`,
    },
    {
      name: 'HTTP-TS（websocket）',
      url: `ws://${host}:8080/live/${streamName}.ts`,
    },
    {
      name: 'HTTP-TS（websockets）',
      url: `wss://${host}:4433/live/${streamName}.ts`,
    },
  ]
}
