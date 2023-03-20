#### v0.33.0 (2022-01)

- [feat] debug dump，支持抓取流数据回放调试
- [feat] http api & notify: 支持获取 hls 播放者数量、码率等信息；支持获取 hls 开始播放、结束播放的事件通知
- [fix] rtp: 解析 rtp extension 扩展头，避免因此导致 rtp 解析失败
- [chore] docker 同时支持 amd 和 arm 架构
- [feat] demo: analyseflv 支持 http flv 流或 flv 文件作为输入
- [feat] 插件化例子：增加读取 flv 文件再通过 CustomPubSession 将数据输入 lalserver 的例子
- [opt] rtmp: 缩小打 chunk 时预分配的内存大小
- [opt] 插件化：Cutsomize Pub 支持 AvPacket、RtmpMsg 两种输入数据的方式
- [opt] Gop 缓冲功能支持配置单个 Gop 内的最大缓冲帧数量
- [fix] 修复 hls 获取 app name 失败的问题
- [fix] flv: 修复 ReadAllTagsFromFlvFile 中没有关闭文件的 bug
- [fix] rtmp: 接收 buff 解析前有效长度检查

#### v0.32.0 (2022-11-10)

- [feat] 自动叠加静音音频。所有协议、所有类型的输入流都已支持，文档见: https://pengrl.com/lal/#/dummy_audio
- [feat] 支持 rtmps、rtsps(server 端)
- [feat] rtp: 支持解析 rtp header 中的 padding 和 csrc
- [feat] demo: pullhttpflv 拉取 http-flv 时可以存储为 flv 文件
- [opt] 二次开发: 当 DelCustomizePubSession 后，调用被删除对象的 FeedAvPacket 方法将返回错误
- [opt] 二次开发: 支持直接使用 json 字符串作为配置内容初始化 ILalServer
- [opt] 兼容性优化。转 ts 时，如果调整时间戳失败则使用调整前的时间戳。
- [opt] 兼容性优化。当 rtmps 和 rtsps 加载签名文件失败时，只打印日志而不退出 lalserver
- [fix] rtsp: 修复 aac rtp type 不是标准值导致无法合帧的问题。提高兼容性
- [fix] http-api: 修复 sub http-flv remote_addr 字段没有值的 bug
- [fix] rtsp: 修复 auth 可能失败的 bug
- [log] 打印 rtsp 信令。丰富多处错误日志，比如转 hls 异常
- [doc] 新增文档：重要概念 https://pengrl.com/lal/#/concept

#### v0.31.1 (2022-10-07)

- [feat] HTTP-API 增加`start_rtp_pub`接口，用于支持 GB28181 的 ps 流
- [feat] 向外暴露 IAuthentication，用于定制化鉴权
- [feat] 向外暴露 ModConfigGroupCreator，支持为特定的 Group 独立配置
- [opt] rtsp: 允许 rtsp 先拉再推，也即没有输入流时，可以先创建 rtsp SubSession
- [feat] rtp: unpacker 支持 hevc ap 格式
- [fix] rtmp: 优化 metadata @SetDataFrame 的处理，解决 flv 录制文件用 ffmpeg 查看 fps 不准的问题 #201
- [fix] rtmp: 修复 PubSession 发送 publish 信令中字段错误导致推流至 youtube 失败的问题 #199
- [perf] rtmp: PullSession 支持配置是否复用接收 message 时的内存块
- [opt] rtmp: ClientSession 推流兼容 vhou url 格式
- [opt] rtmp: add float64 support to amf0::WriteObject
- [opt] rtsp: PullSession 在 setup 阶段如果对端没有回复 server port，依然尝试继续拉流，增强兼容性
- [fix] rtsp: server 端没有收到前面的信令直接收到 PLAY 信令，主动关闭连接，避免崩溃
- [fix] rtsp: 解析 sdp 中 MPEG4-GENERIC 大小写导致 aac 音频无法正常合帧的问题
- [fix] hls: 修复 hls 鉴权时 streamName 取值错误导致无法正常鉴权的问题
- [fix] hls: 修复流名称中包含-中划线时 hls 异常的问题
- [opt] mpegts: rtmp2mpegts 的时间戳重打从 0 开始，兼容时间戳太大时 vlc 播放不了的问题
- [opt] remux: 新增 RtspRemuxerAddSpsPps2KeyFrameFlag 参数，用于强制在关键帧数据包前加 sps、pps。目的是增强兼容性。
- [opt] remux: Rtmp2AvPacketRemuxer 可携带自定义参数
- [fix] remux: avpacket2rtmp nal 以 00 00 01 开头时崩溃，丢弃 aud
- [refactor] rtprtcp: 重构 RtpPacketList
- [chore] 构建 windows 可执行文件时增加.exe 后缀
- [opt] HTTP-API 和 Notify: bitrate 重命名为 bitrate_kbits
- [opt] HTTP-API 和 Notify: StatGroup 增加 AppName 字段
- [opt] HTTP-Notify: session 相关的回调增加 ReadBytesSum 和 WroteBytesSum 字段

#### v0.30.1 (2022-06-15)

- [feat] HTTP-API：新增 start/stop_relay_pull 接口，支持 rtmp 和 rtsp，支持设置超时时间，自动关闭，重试次数，rtsp 类型等参数
- [feat] HTTP-API：kick_session 接口支持踢掉 pub/sub/pull 类型的 session
- [feat] HTTP-Notify：增加 on_relay_pull_start 和 on_relay_pull_stop 回调
- [feat] HTTP-Notify：增加 hls 生成 ts 文件的事件回调
- [feat] rtmp: client 端支持 rtmps 加密传输
- [feat] rtmp: client 端支持 adobe auth 验证
- [feat] rtsp: server 端支持 basic/digest auth 验证
- [feat] lalserver: 运行参数-p 可设置当前工作路径
- [feat] package gb28181: 大体完成 ps 协议解析
- [feat] 新增 remux.Rtmp2AvPacketRemuxer，方便和 ffmpeg 库协作
- [fix] rtsp: 修复 url path 路径不存在时，url 解析失败的问题
- [fix] rtmp: 解析 amf, object 中嵌套 object 导致崩溃
- [fix] rtmp: ChunkComposer 的 error 日志中的对象写错导致崩溃
- [fix] 修复 rtmp 转 ts 时，265 判断错误
- [fix] lalserver: 修复竞态条件下接收 rtsp 流崩溃的 bug
- [fix] lalserver: relay push 判空错误导致崩溃
- [chore] release 发版时，增加 arm32, arm64, macos arm 对应的二进制文件
- [refactor] 新增 package h2645
- [refactor] 将所有 session 的 ISessionStat 的实现聚合到 BasicSessionStat
- [refactor] rename HttpSubSession -> BasicHttpSubSession
- [refactor] HTTP-API: 所有事件都包含的公共字段聚合到 EventCommonInfo 中
- [opt] aac: 补全 AscContext.samplingFrequencyIndex 采样率的取值
- [log] 访问非法 HTTP-API 路径时打印警告日志

#### v0.29.1 (2022-05-03)

- [feat] lalserver: 支持集成第三方协议的输入流 https://pengrl.com/#/customize_pub
- [feat] rtmp: pull session 增加 ack 应答，提高兼容性
- [opt] rtsp: lalserver 增加配置项`rtsp->out_wait_key_frame_flag`，用于控制发送 rtsp 数据时，是否等待关键帧再发送
- [opt] 增强健壮性，检查 rtmp 消息长度有效性
- [fix] 增强兼容性，rtmp 转 mpegts 时，使用 nalu 中的 sps 和 pps
- [fix] lalserver 鉴权: 修复 rtmp 拉流鉴权的问题
- [fix] 解析 H265 类型不够全面，导致推流失败 #140
- [fix] lalserver 录制: 是否创建 mpegts 录制根目录由 mpegts 录制开关控制
- [fix] demo: dispatch 调度程序检测保活时间单位错误
- [perf] mpegts: 加大内存预分配大小

#### v0.28.0 (2022-03-27)

- [feat] httpts: 支持 gop 缓冲，提高秒开 #129
- [opt] hls: 增加 delete_threshold 配置，用于配置过期 TS 文件的保存时间 #120
- [opt] rtsp sub 改为异步发送
- [opt] lalserver: relay push 增加超时检查，增加带宽统计
- [opt] lalserver: relay pull 的 rtmp 流也转换为 rtsp
- [opt] lalserver: rtsp sub 也支持触发 relay pull
- [fix] aac: 支持 22050 采样频率，修复该频率下转 rtsp 失败的问题
- [fix] avc: 增强兼容性，处理单个 seq header 中存在多个 sps 的情况 #135
- [fix] mpegts: 修复单音频场景，有一帧音频重复的问题
- [fix] rtsp: Basic auth 的 base64 编码
- [fix] rtsp: 增强容错性，修复 rtmp 输入流没有 seq header 时，rtmp 转 rtsp 内崩溃的问题
- [fix] lalserver: 优雅关闭 pprof 和 http server
- [perf] mpegts: 优化转换 mpegts 的性能
- [refactor] 将转换 mpegts 的代码从 package hls 独立出来，移动到 package remux 中
- [refactor] lalserver: 大幅重构 logic.Group，为支持插件化做准备
- [log] 支持独立设置单个 pkg 的日志配置 #62
- [log] rtmp 和 rtsp 收包时添加 trace 级别日志 #63
- [log] rtmp: 优化定位问题的日志 #135
- [test] innertest 增加单音频，单视频，httpts sub 的测试

#### v0.27.1 (2022-01-23)

- [feat] 新增 simple auth 鉴权功能，见文档： https://pengrl.com/lal/#/auth
- [feat] httpflv: PullSession 支持 https，支持 302 跳转
- [feat] rtmp: client 类型的 session 新增方法用于配置 WriteBuf 和 ReadBuf 大小，以及 WriteChanSize
- [opt] rtmp: 收到 ping request 回应 ping response
- [fix] rtmp: 增强兼容性，当收到的 rtmp message 中 aac seq header payload 长度为 0 时忽略，避免崩溃 #116
- [fix] rtmp: 增强兼容性，当收到的 rtmp message 中的 payload 长度为 0 时忽略 #112
- [opt] rtsp: 增强兼容性，处理 rtsp 信令中 header 存在没有转义的\r\n 的情况
- [fix] rtsp: 增强兼容性，修复读取 http 返回 header 解析失败的 bug #110
- [opt] https: 增强兼容性，服务初始化失败时打印错误日志而不是退出程序
- [opt] avc: 增强兼容性，分隔 avcc 格式的 nal 时，如果存在长度为 0 的 nal 则忽略
- [fix] sdp: 增强兼容性，fmtp 内发生换行时做兼容性处理
- [fix] httpflv: 修复 httpflv 多级路径下无法播放的问题
- [opt] 整理完所有 error 返回值，error 信息更友好
- [log] 通过配置文件控制 group 调试日志
- [log] rtsp: client 信令增加错误日志
- [fix] 修复 logic.Option.NotifyHandler 首字母小写外部无法设置的问题
- [refactor] 将 logic 包中的 DummyAudioFilter, GopCache, LazyRtmpChunkDivider, LazyRtmpMsg2FlvTag 移入 remux 中
- [refactor] rtmp: base.Buffer 移入 naza 中
- [chore] CI: 迁移到 github action，已支持 linux，macos 平台，Go1.14 和 Go1.17，每次 push 代码和每周定时触发，并自动提交 docker hub 镜像
- [chore] 修复 go vet signal unbound channel 的警告
- [test] 提高测试覆盖，目前 lal 测试覆盖超过 60%，文档中增加测试覆盖率徽章
- [test] innertest 增加 m3u8 文件检测，增加 http api
- [test] 测试各 session 的 ISessionUrlContext 接口
- [test] 修复 base/url_test.go 中的测试用例

#### v0.26.0 (2021-10-24)

- [perf] rtmp 合并发送功能使用 writev 实现
- [feat] 兼容性: 运行时动态检查所有配置项是否存在
- [refactor] 可定制性: logic: 抽象出 ILalServer 接口；业务方可在自身代码中创建 server，选择是否获取 notify 通知，以及使用 api 控制 server
- [refactor] 兼容性: 两个不太标准的 sdp 格式(a=fmtp 的前面或后面有多余的分号)
- [refactor] 兼容性: aac 解析失败日志; 输入的 rtp 包格式错误; 输入的 rtmp 包格式错误; hls 中分割 nalu 增加日志; base.HttpServerManager 增加日志
- [refactor] 兼容性: 再增加一个配置文件默认搜索地址
- [refactor] 可读性: logic: ServerManager 和 Config 不再作为全局变量使用；去除 entry.go 中间层；iface_impl.go 移入 innertest 中；signal_xxx.go 移入 base 中
- [refactor] 易用性: demo/pullrtsp2pushrtsp: 抽象出 RtspTunnel 结构体，一个对象对应一个转推任务
- [refactor] logic: 新增 GroupManager，管理所有 Group
- [chore] 配置文件中 httpflv 和 httpts 的 url_pattern 初始值改为没有限制
- [chore] 使用 github actions 做 CI（替换掉之前的 travisCI）
- [chore] 修复 build.sh 在 linux 下获取 git tag 信息失败报错的问题；去掉单元测试时不必要的错误日志
- [chore] 增加 docker 运行脚本 run_docker.sh

#### v0.25.0 (2021-08-28)

- [feat] 为 rtmp pub 推流添加静音 AAC 音频(可动态检测是否需要添加；配置文件中可开启或关闭这个功能)
- [feat] 优化和统一所有 client 类型 session 的使用方式：session 由于内部或对端原因导致关闭，外部不再需要显式调用 Dispose 函数释放资源
- [feat] 增强兼容性：rtsp digest auth 时，如果缺少 algorithm 字段，回复时该字段默认设置为 MD5
- [refactor] package avc: 重新实现 sps 的解析
- [refactor] 新增函数 remux.FlvTag2RtmpChunks()
- [refactor] 增强健壮性：package rtmp: 对端协议错误时，主动关闭对端连接而不是主动 panic
- [refactor] 整理 logic/group 的代码
- [refactor] httpflv.Sub 和 httpts.Sub 显式调用 base.HttpSubSession 的函数
- [fix] rtsp 信令打包中部分字段缺少空格
- [chore] 增强易用性：修改配置文件中的默认配置：hls、flv、mpegts 的文件输出地址由绝对路径/tmp 修改为相对路径./lal_record

#### v0.24.0 (2021-07-31)

- [feat] lalserver 支持用 rtsp sub 协议拉取 rtmp 的 pub 推流 (#97)
- [feat] 新增 demo pullrtmp2pushrtsp，可以从远端拉取 rtmp 流并使用 rtsp 转推出去 (#96)
- [feat] package rtprtcp: 支持 h264，h265，aac rtp 打包 (#83)
- [feat] package sdp: 支持 sdp 打包 (#82)
- [fix] 确保 rtsp sub 拉流从关键帧开始发送数据，避免因此引起的花屏
- [fix] rtsp: 提高兼容性。兼容 rtsp auth 同时存在 Digest 和 Basic 两种字段的情况
- [fix] rtsp: 提高兼容性。兼容 rtsp 摄像头的 sdp 中包含 aac，但是没有 config 字段（后续也没有 aac rtp 包）的情况
- [fix] rtmp: 提高兼容性。兼容 rtmp client session 处理对端回复两次 publish 或 play 信令的情况
- [fix] rtmp: 提高兼容性。修复没有解析 amf object 中 null 类型数据导致和其他 rtmp 开源服务无法建连的问题 (#102)
- [fix] rtmp: 信令打包参考本地 chunk size
- [fix] rtsp: 修复 rtsp sub session 没有正常释放导致协程泄漏的问题
- [fix] 修复 lalserver arm32 编译失败的问题 (#92)
- [fix] 修复 lalserver http 服务全部配置为不使用时崩溃的问题 (#58)
- [fix] 修复 hls.Muxer 没有设置回调会导致崩溃的问题 (#101)
- [fix] 修复 demo calcrtmpdelay 码率计算大了 5 倍的问题 (#58)
- [refactor] package httpflv: 新增 FlvFilePump，可循环匀速读取 flv 文件
- [refactor] package aac: 增加 adts, asc, seqheader 间的转换代码；重构了整个包
- [refactor] package avc: 部分函数提供复用传入参数内存和新申请内存两种实现
- [refactor] demo benchrtmpconnect: 关闭日志，超时时长改为 30 秒，优化建连时长小于 1 毫秒的展示 (#58)
- [chore] 增加 Dockerfile (#91)

#### v0.23.0 (2021-06-06)

- [feat] HTTP 端口复用：HTTP-FLV, HTTP-TS, HLS 可使用相同的监听端口。HTTPS 也支持端口复用 #64
- [feat] HTTPS：HTTP-FLV，HTTP-TS，HLS 都支持 HTTPS。WebSocket-FLV，WebSocket-TS 都支持 WebSockets #76
- [feat] 配置 HTTP 流的 URL 路径: HTTP-FLV，HTTP-TS，HLS 的 URL 路由路径可以在配置文件中配置 #77
- [feat] RTMP 支持合并发送 #84
- [refactor] 重构整个项目的命名风格 #87
- [fix] RTMP GOP 缓存设置为 0 时，可能花屏 #86
- [feat] 支持海康威视 NVR、大华 IPC 的 RTSP 流（SDP 不包含 SPS、PPS 等数据，而是通过 RTP 包发送） #74 #85
- [feat] 配置灵活易用话。增加`default_http`。HTTP-FLV，HTTP-TS，HLS 可以独立配置监听地址相关的项，也可以使用公共的`default_http`
- [feat] HLS 默认提供两种播放 URL 地址 #64
- [refactor] package hls: 将 HTTP URL 路径格式，文件存储路径格式，文件命名格式，映射关系抽象出来，业务方可在外层实现 IPathSolver 接口做定制 #77
- [feat] 增加几个默认的配置文件加载路径
- [feat] package rtprtcp: 增加用于将 H264 Nalu 包切割成 RTP 包的代码 #83
- [refactor] package avc: 增加拆分 AnndexB 和 AVCC Nalu 包的代码 #79
- [refactor] 重构 httpflv.SubSession 和 httpts.SubSession 的重复代码

#### v0.22.0 (2021-05-03)

- [feat] 录制新增支持：flv 和 mpegts 文件。 录制支持列表见： https://pengrl.com/lal/#/LALServer (#14)
- [feat] h265 新增支持： hls 拉流，hls 录制；http-ts 拉流，mpegts 录制。h265 支持列表见： https://pengrl.com/lal/#/LALServer (#65)
- [feat] 拉流新增支持：websocket-flv，websocket-ts。拉流协议支持列表见： https://pengrl.com/lal/#/LALServer
- [feat] hls: 支持内存切片。 (#50)
- [fix] rtmp ClientSession 握手，c2 的发送时机，由收到 s0s1s2 改为收到 s0s1 就发送，解决握手失败的 case。 (#42)
- [fix] rtsp h265: 转 rtmp 时处理错误导致无法播放
- [fix] rtsp h265: ffmpeg 向 lalserver 推送 rtsp h265 报错。 (#55)
- [test] travis ci: 自动化单元测试 os 增加 osx, windows, arch 增加 arm64, ppc64le, s390x。 (#59)
- [feat] rtmp ClientSession 支持配置使用简单握手，复杂握手 (#68)

#### v0.21.0 (2021-04-11)

- [feat] package rtmp: 支持 Aggregate Message
- [feat] lalserver: 新增配置项 hls.cleanup_mode，支持三种清理 hls 文件的模式，具体说明见 https://pengrl.com/lal/#/ConfigBrief
- [feat] package rtsp: 支持 aac fragment 格式（一个音频帧被拆分成多个 rtp 包），之前这种 aac 格式可能导致崩溃
- [doc] 新增文章《rtmp 中的各种 ID》，见 https://pengrl.com/lal/#/RTMPID
- [doc] 新增文章《rtmp handshake 握手之简单模式和复杂模式》，见 https://pengrl.com/lal/#/RTMPHandshake
- [fix] rtsp 推流时，rtp 包时间戳翻转导致的错误（比如长时间推流后 hls 一直强制切片）
- [fix] lalserver 的 group 中，rtsp sub 超时时，锁重入导致服务器异常阻塞不响应
- [fix] 修复 mipsle 架构下 rtsp 崩溃
- [fix] 修复 lalserver 中（rtsp.BaseInSession 以及 logic.Group）的一些竞态读写，https://github.com/q191201771/lal/issues/47
- [fix] demo: 两个拉 httpflv 流的 demo，main 函数退出前忘记等待拉流结束
- [refactor] package rtprtcp: 重构一些函数名
- [refactor] package rtprtcp: 重构 rtp unpacker，业务方可以使用默认的 container，protocol 策略，也可以自己实现特定的协议解析组包策略
- [refactor] lalserver: 整理配置文件加载与日志初始化部分的代码
- [doc] 启用英文版本 README.md 作为 github 首页文档展示
- [doc] lalserver: 新增配置项 conf_version，用于表示配置文件的版本号
- [doc] lalserver: 启动时日志中增加 lal logo

#### v0.20.0 (2021-03-21)

- [feat] 新增 app/demo/calcrtmpdelay，可用于测量 rtmp 服务器的转发延时，拉流支持 rtmp/httpflv
- [feat] app/demo/pushrtmp 做压测时，修改为完全并行的模式
- [fix] 修复 32 位 arm 环境使用 rtsp 崩溃
- [refactor] 统一各 Session 接口
- [refactor] 使用新的 unique id 生成器，提高性能
- [doc] 新增文档 ffplay 播放 rtsp 花屏 https://pengrl.com/lal/#/RTSPFFPlayBlur

#### v0.19.1 (2021-02-01)

- [fix] 获取 group 中播放者数量时锁没有释放，导致后续无法转发数据

#### v0.19.0 (2021-01-24)

- [feat] demo，新增 app/demo/pullrtsp2pushrtsp，可拉取 rtsp 流，并使用 rtsp 转推出去
- [feat] demo，新增/app/demo/pullrtmp2pushrtmp，从远端服务器拉取 RTMP 流，并使用 RTMP 转推出去，支持 1 对 n 转推
- [feat] lalserver，运行参数中没指定配置文件时，尝试从几个常见位置读取
- [feat] windows 平台下，执行程序缺少运行参数时，等待用户键入回车再退出程序，避免用户双击打开程序时程序闪退，看不到提示信息
- [feat] rtsp，支持 auth basic 验证
- [feat] rtsp，实现 PushSession
- [feat] rtsp，所有 Session 类型都支持 auth，interleaved
- [fix] rtsp，只有输入流中的音频和视频格式都支持时才使用 queue，避免只有音频或视频时造成延迟增加
- [fix] rtsp，输入流只有单路音频或视频时，接收对象设置错误导致崩溃
- [fix] rtsp，client session 的所有信令都处理 401 auth
- [fix] rtsp，in session 使用 rtp over tcp 时，收到 sr 回复 rr
- [fix] rtsp，setup 信令 header 中的 transport 字段区分 record 和 play，record 时添加 mode=record
- [fix] avc，整体解析 sps 数据失败时，只解析最基础部分
- [refactor] rtsp，重构部分逻辑，聚合至 sdp.LogicContext 中
- [refactor] rtsp，新增 ClientCommandSession，将 PushSession 和 PullSession 中共用的信令部分抽离出来
- [refactor] rtsp，新增 BaseOutSession，将 PushSession 和 SubSession 中共用的发送数据部分抽离出来
- [refactor] rtsp，整理所有 session，包含生命周期，ISessionStat、IURLContext、Interleaved 收发等函数，整理 debug 日志
- [doc] 启动 lal 官方文档页： https://pengrl.com/lal
- [doc] 新增文档《rtmp url，以及 vhost》： http://pengrl.com/lal/#/RTMPURLVhost
- [chore] Go 最低版本要求从 1.9 上升到 1.13

#### v0.18.0 (2020-12-27)

- [feat] 实现 rtsp pull session
- [feat] demo，增加`/app/demo/pullrtsp2pushrtmp`，可拉取 rtsp 流，并使用 rtmp 转推出去
- [feat] demo，增加`/app/demo/pullrtsp`，可拉取 rtsp 流，存储为 flv 文件
- [feat] rtsp interleaved(rtp over tcp)模式。pub, sub, pull 都已支持
- [feat] rtsp，pull 支持 auth digest 验证
- [feat] rtsp，pull 支持定时发送`GET_PARAMETER` rtsp message 进行保活（对端支持的情况下）
- [feat] rtsp，输入流音频不是 AAC 格式时，保证视频流可正常 remux 成其他封装协议
- [feat] rtsp，pull 开始时发送 dummy rtp/rtcp 数据，保证对端能成功发送数据至本地
- [feat] rtsp，修改 rtsp.AVPacketQueue 的行为：当音频或者视频数量队列满了后，直接出队而不是丢弃
- [feat] logic，rtsp pub 转发给 rtsp sub
- [feat] logic，rtsp pub 转发给 relay rtmp push
- [feat] remux，新增 package，用于处理协议转封装
- [refactor] 重构所有 client session 解析 url 的地方
- [refactor] 所有 session 实现 ISessionStat 接口，用于计算、获取 bitrate 等流相关的信息
- [refactor] 所有 session 实现 ISessionURLContext 接口，用于获取流 url 相关的信息
- [refactor] rtmp/httpflv/rtsp，统一所有 PullSession：超时形式；Pull 和 Wait 函数
- [fix] rtsp，将以下包返回给上层：rtsp pub h265, single rtp packet, VPS, SPS, PPS, SEI
- [fix] sdp，修复解析及使用 sdp 错误的一些 case
- [fix] aac，正确处理大于 2 字节的 AudioSpecificConfig
- [fix] avc，尝试解析 scaling matrix

#### v0.17.0 (2020-11-21)

- [feat] 增加 HTTP Notify 事件回调功能，见 https://pengrl.com/p/20101
- [feat] 增加`/app/demo/dispatch`示例程序，用于演示如何结合 HTTP Notify 加 HTTP API 构架一个 lalserver 集群
- [feat] 配置文件中增加配置项，支持配置是否清除过期流的 HLS 文件
- [feat] lalserver 的 session 增加存活检查，10 秒没有数据会主动断开连接
- [feat] lalserver 的 group 没有 sub 拉流时，停止对应的 pull 回源
- [feat] HTTP API，增加`/api/ctrl/start_pull`接口，可向 lalserver 发送命令，主动触发 pull 回源拉流
- [feat] HTTP API，增加`/api/ctrl/kick_out_session`接口，可向 lalserver 发送命令，主动踢掉指定的 session
- [feat] HTTP API `/api/stat/lal_info` 中增加`server_id`字段
- [feat] HTTP API，group 结构体中增加 pull 结构体，包含了回源拉流的信息
- [fix] 配置文件静态 relay push 转推方式中，push rtmp url 透传 pub rtmp url 的参数
- [chore] 增加`gen_tag.sh`，用于打 tag

#### v0.16.0 (2020-10-23)

- [feat] rtsp pub h265（lal 支持接收 rtsp h265 视频格式的推流）
- [feat] 增加 HTTP API 接口，用于获取服务的一些信息，具体见： https://pengrl.com/p/20100/
- [fix] 修复部分使用 adobe flash player 作为 rtmp 拉流客户端，拉流失败的问题
- [fix] 修复接收 rtsp pub 推流时，流只有视频（没有音频）流处理的问题

#### v0.15.1 (2020-09-19)

- [fix] 配置文件没有开启 HTTPS-FLV 时，错误使用 nil 对象导致崩溃

#### v0.15.0 (2020-09-19)

- [feat] 支持 HTTP-TS sub 长连接拉流
- [feat] 支持 HTTPS-FLV
- [feat] 支持跨域请求：HTTP-FLV sub, HTTP-TS sub, HLS 这几个 HTTP 类型的拉流
- [feat] 支持 HLS 录制与回放（在原有 HLS 直播的基础之上）
- [fix] 修复 record m3u8 文件无法更新的问题
- [fix] 修复 rtsp pub 无法接收 IPv6 RTP 数据的问题
- [fix] 修复 windows 平台编译失败的问题（单元测试 package innertest 中使用 syscall.Kill 导致）
- [feat] demo pullrtmp2hls: 新增 demo，从远端服务器拉取 rtmp 流，存储为本地 hls 文件
- [feat] 新增 package alpha/stun，学习 stun 协议
- [feat] 部分 rtsp pub 支持 h265 的代码，未完全完成

#### v0.14.0 (2020-08-23)

- [feat] lalserver 实现 rtsp pub 功能。支持接收 rtsp(rtp/rtcp)推流，转换为 rtmp,httpflv,hls 格式供拉流使用
- [feat] hls.Muxer 释放时，向 m3u8 文件写入`#EXT-X-ENDLIST`
- [refactor] 新增 package sdp，rtprtcp
- [refactor] 新增 package base，整理 lal 项目中各 package 的依赖关系
- [refactor] 新增 package mpegts，将部分 package hls 中代码抽离出来
- [refactor] 重写 package aac
- [feat] 在各协议的标准字段中写入 lal 版本信息
- [fix] group Dispose 主动释放所有内部资源，与中继转推回调回来的消息，做同步处理，避免崩溃
- [fix] package avc: 修复解析 sps 中 PicOrderCntType 为 2 无法解析的 bug
- [refactor] 重命名 app/demo 中的一些程序名
- [feat] package rtmp: 增加 BuildMetadata 函数
- [test] 使用 wontcry30s.flv 作为单元测试用的音视频文件
- [chore] 使用 Makefile 管理 build, test
- [doc] 增加文档: https://pengrl.com/p/20080/
- [log] 整理所有 session 的日志

#### v0.13.0 (2020-07-18)

- [feat] package httpflv: pull 拉流时，携带 url 参数
- [feat] package avc: 提供一些 AVCC 转 AnnexB 相关的代码。学习解析 SPS、PPS 内部的字段
- [fix] package rtmp: 打包 rtmp chunk 时扩展时间戳的格式。避免时间戳过大后，发送给 vlc 的数据无法播放。
- [fix] package hls: 写 ts 视频数据时，流中没有 spspps 导致崩溃
- [fix] package logic: 修复重复创建 group.RunLoop 协程的 bug
- [perf] package logic: 广播数据时，内存块不做拷贝
- [perf] package hls: 切片 188 字节 buffer 复用一块内存
- [refactor] package hls: 使用 package avc
- [refactor] 所有回调函数的命名格式，从 CB 后缀改为 On 前缀
- [refactor] 整理日志
- [style] Nalu 更改为 NALU
- [doc] 增加 PR 规范
- [test] innertest 中对 hls 生成的 m3u8 和 ts 文件做 md5 验证
- [chore] 下载单元测试用的 test.flv 失败，本地文件大小为 0 时，去备用地址下载

#### v0.12.0 (2020-06-20)

- [feat] lalserver 增加回源功能
- [fix] rtmp.AMF0.ReadObject 函数内部，增加解析子类型 EcmaArray。避免向某些 rtmp 服务器推流时，触发断言错误
- [fix] 解析 rtmp metadata 时，兼容 Object 和 Array 两种外层格式
- [refactor] 重写了 lalserver 的中继转推的代码

#### v0.11.0 (2020-06-13)

- [feat] lalserver 增加中继转推(relay push)功能，可将接收到的推流(pub)转推(push)到其他 rtmp 类型的服务器，支持 1 对 n 的转推
- [feat] package rtmp: 新增函数 amf0::ReadArray，用于解析 amf array 数据
- [refactor] `rtmp/client_push_session`增加当前会话连接状态
- [fix] demo/analyseflv: 修复解析 metadata 的 bug
- [perf] httpflv 协议关闭时，不做 httpflv 的 GOP 缓存
- [refactor] logic 中的配置变更为全局变量
- [refactor] lal/demo 移动到 lal/app/demo
- [refactor] 日志整理

#### v0.10.0 (2020-06-06)

- [refactor] app/lals 重命名为 app/lalserver，避免描述时容易和 lal 造成混淆
- [refactor] 将 app/lalserver 的大部分逻辑代码移入 pkg/logic 中
- [test] 将所有 package 的 Server、Session 等内容的实例测试收缩至 package innertest 中，多个 package 都可以共用它做单元测试
- [refactor] lalserver 配置中增加显式 enable 字段，用于开启关闭特定协议
- [refactor] 各 package 的 Server 对象增加独立的 Listen 函数，使得绑定监听端口失败时上层可以第一时间感知
- [feat] demo/analyseflv，增加 I 帧间隔检查，增加 metadata 分析
- [fix] package avc: 修复函数 CalcSliceType 解析 I、P、B 帧类型的 bug
- [fix] package hls: 检查输入的 rtmp message 是否完整，避免非法数据造成崩溃
- [perf] gop 缓存使用环形队列替换 FIFO 动态切片队列
- [refactor] package aac: 函数 ADTS::PutAACSequenceHeader 检查输入切片长度
- [refactor] package aac: 删除函数 CaptureAAC
- [feat] 增加 demo/learnrtsp，pkg/rtsp，开始学习 rtsp

#### v0.9.0 (2020-05-30)

- [feat] 新增 HLS 直播功能
- [fix] 接收 rtmp 数据时，同一个 message 的多个 chunk 混合使用 fmt1，2 时，可能出现时间戳多加的情况
- [refactor] 将 app 目录下除 lals 的其他应用移入 demo 目录下
- [feat] 新增两个 demo：analyseflv 和 analysehls，分别用于拉取 HTTP-FLV 和 HLS 的流，并进行分析
- [fix] 修改 rtmp 简单握手，修复 macOS ffmpeg 4.2.2 向 lals 推 rtmp 流时的握手警告

#### v0.8.1 (2020-05-01)

- [feat] 新 package hevc
- [fix] windows 平台缺少 USER1 信号导致编译失败
- [fix] gop 缓存时，不以 I 帧开始的流会崩溃
- [chore] 提供各平台二进制可执行文件的压缩包
- [doc] package aac 增加一些注释
- [refactor] 使用 naza v0.10.0

#### v0.8.0 (2020-04-18)

- [feat] 支持 H265/HEVC
- [feat] 支持 GOP 缓存

#### v0.7.0 (2019-12-13)

- [fix] package logic: 转发 rtmp metadata 时，message header 中的 len 字段可能和 body 实际长度不一致
- [feat] rtmp.AVMsg 增加判断包中音视频数据是否为 seq header 等函数
- [feat] app/httpflvpull 使用 naza/bitrate 来统计音频和视频的带宽
- [refactor] logic config 的部分配置移动至 app/lals 中
- [refactor] logic 增加 LazyChunkDivider 组织代码
- [log] package rtmp: 一些错误情况下，对接收到包 dump hex
- [test] 测试推送 n 路 rtmp 流至 lals，再从 lals 拉取这 n 路 rtmp 流的性能消耗
- [doc] README 中增加测试过的推拉流客户端
- [dep] update naza -> v0.7.1

#### v0.6.0 (2019-11-08)

- package rtmp: 结构体的属性重命名 AVMsg.Message -> AVMsg.Payload
- app/flvfile2rtmppush: 支持推送多路 rtmp 流，相当于一个压测工具
- app/rtmppull: 支持对特定的一路流并发拉取多份，相当于一个压测工具
- README 中补充性能测试结果

#### v0.5.0 (2019-11-01)

- package rtmp:
  - 增加结构体 ClientSessionOption，PushSessionOption，PullSessionOption
  - 增加结构体 AVMsg
  - ClientSession 作为 PushSession 和 PullSession 的私有成员
  - 将绝对时间戳移入到 Header 结构体中
  - PullSession::Pull OnReadAVMsg with AVMsg
  - AVMsgObserver::ReadRTMPAVMsgCB -> OnReadRTMPAVMsg
- package httpflv:
  - PullSessionOption
  - OnReadFLVTag
  - some func use Tag instead of \*Tag
  - 整个包的代码做了一次整理
  - FlvFileReader 在 ReadTag 中懒读取 flv header
- package logic:
  - 使用 rtmp.AVMsg
  - 增加两个函数 MakeDefaultRTMPHeader，FLVTagHeader2RTMPHeader

#### v0.4.0 (2019-10-25)

- [功能] 将 rtmp pub session 的音视频转发给 httpflv sub session
- [依赖] httpflv ServerSubSession 使用 naza connection
- [其他] 增加测试，加载 flv 文件后使用 rtmp 推流至服务器，然后分别使用 rtmp 和 httpflv 将流拉取下来，存成文件，判断和输入文件是否相等

#### v0.3.2 (2019-10-19)

- [功能] 默认的 rtmp 地址
- [依赖] naza 更新为 0.4.3
- [架构调整] lal 中的服务器更名为 lals
- [其他] 从远端下载 flv 测试文件，跑单元测试
- [其他] test.sh 中加入更多 go tool
- [其他] 所有源码文件添加 MIT 许可证

#### v0.3.1 (2019-09-30)

- [功能] 读取配置文件时，部分未配置的字段设置初始值
- [其他] build.sh 中 git 信息单引号替换成双引号
- [其他] test.sh 中 加入 gofmt 检查
- [其他] 更新 naza -> 0.4.0

#### v0.3.0 (2019-09-27)

- [功能] package logic: 增加 func FlvTag2RTMPMsg
- [代码调整] package rtmp: ClientSession 和 ServerSession 使用 nezha 中的 connection 做连接管理
- [代码调整] package rtmp: 增加 struct ChunkDivider
- [代码调整] package rtmp: 调整一些接口
- [代码调整] package httpflv: 删除了 group， gop 相关的代码，后续会放入 package logic 中
- [测试] package rtmp: 增加 `example_test.go` 用于测试整个 rtmp 包的流程
- [其他] 更新 nezha -> 0.3.0

#### v0.2.0 (2019-09-21)

- [结构调整] 将 app/lal 的部分代码抽离到 pkg/logic 中，使得其他 app 可以使用
- [结构调整] 将协议层 rtmp.Group 和 应用层 app/lal 中的 GroupManager 合并为 逻辑层 pkg/logic 的 Group，以后只在逻辑层维护一个 Group，用于处理各种具体协议的输入输出流的挂载
- [功能] pkg/logic 中新增 trans.go: RTMPMsg2FlvTag
- [功能] PubSession 退出时，清空缓存的 meta、avc header、aac header
- [功能] PubSession 已经存在时，后续再连接的 Pub 直接关闭掉
- [功能] app/rtmppull 存储为 flv 文件
- [优化] chunk divider: calcHeader 在原地计算
- [其他] rtmp 中所有 typeid 相关的类型 int -> uint8，msgLen 相关的类型 int -> uint32
- [其他] 更新 nezha，新版本的日志库
- [其他] 整理日志
- [其他] pprof web 地址放入配置文件中
- [测试] 使用一些开源工具对 app/lal 做推流、拉流测试

#### v0.1.0 (2019-09-12)

- /app/flvfile2rtmppush 优化推流平稳性
- bugfix rtmp 推拉流信令时可以携带 url 参数，并且在做上下行匹配时去掉 url 参数
- rtmp.ServerSession 处理 typeidAck
- 增加 amf0.WriteNull 和 amf0.WriteBoolean；WriteObject 中增加 bool 类型；bugfix: ReadString 当长度不足时返回 ErrAMFTooShort 而不是 ErrAMFInvalidType
- app lal 接收 USER1 USER2 信号，优雅退出
- 日志相关的配置放入配置文件中
- 整理代码；整理日志；整理 build.sh
- 增加 rtmp.HandshakeClientComplex 复杂握手模式
- 整理一些 struct 的 Dispose 方法
- CaptureAVC 添加错误返回值
- 增加一些单元测试和 benchmark
- 更新 nezha 0.1.0
- errors.PanicIfErrorOccur -> log.FatalIfErrorNotNil

#### v0.0.1 (2019-09-03)

1. 提供 `/app/flvfile2rtmppush` 给业务方使用
