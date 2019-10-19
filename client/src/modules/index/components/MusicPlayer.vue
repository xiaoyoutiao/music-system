<template>
    <div class="music-player-container">
        <!-- 专辑图 -->
        <div
            :class="{
      'music-player-albumPic': true,
      'music-player-albumPic-play': isPlay}"
        >
            <img :src="currentMusic?currentMusic.albumUrl: defaultPic" alt="专辑图" />
        </div>
        <!-- 歌曲名-->
        <h4 v-if="list[PlayIndex]" class="music-player-songname">{{list[PlayIndex].songname}}</h4>
        <!-- 进度条 -->
        <div ref="music-player-progress" class="music-player-progress" @click="clickPropress">
            <span id="music-player-propress-done" :style="{width:propressDoneWidth}">
                <span
                    id="music-player-propress-point"
                    draggable
                    @dragenter.prevent="preventIcon"
                    @dragover.prevent="preventIcon"
                    @drag="dragPropress"
                    @dragend="dragendPropress"
                ></span>
            </span>
            <span
                class="music-icon-music-time"
                draggable="false"
            >{{currentTime | sec2min}} / {{~~duration | sec2min}}</span>
        </div>
        <!-- 控制按钮组 -->
        <div ref="music-player-controlGroup" class="music-player-controlGroup">
            <span @click="switchSong(-1)" title="上一首" class="MusicIcon music-icon-music-prev"></span>
            <span
                @click="switchMusic"
                :title="isPlay?'暂停':'播放'"
                :class="{
            'MusicIcon': true,
            'music-icon-music-pause': isPlay,
            'music-icon-music-play': !isPlay
            }"
            ></span>
            <span @click="switchSong(1)" title="下一首" class="MusicIcon music-icon-music-next-copy"></span>
        </div>
        <!-- 模式和声音 -->
        <div class="music-player-module">
            <span
                :class="{
        'el-icon-refresh': isLoop,
        'el-icon-sort': !isLoop}"
                @click="changeModule"
                title="播放模式"
            ></span>
            <span
                :class="{
        'MusicIcon music-icon-sound-none': isMuted || audioVolume === 0,
        'MusicIcon music-icon-sound-low': audioVolume > 0 && audioVolume <= 33,
        'MusicIcon music-icon-sound-middle': audioVolume > 33 && audioVolume <= 66,
        'MusicIcon music-icon-sound-hight': audioVolume > 66 && audioVolume <= 100
      }"
                @click="soundSwitch"
            ></span>
            <div class="music-player-sound-box">
                <div id="music-player-sound-progress">
                    <div id="music-player-sound-done" :style="{height: soundDoneHeight}">
                        <i id="music-player-sound-point" draggable @drag="dragSound"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="music-player-lyric-box">
            <p
                v-for="(lyr, index) in nowLyric"
                :key="index"
                :class="{'lyric-hightlight':index==4}"
            >{{lyr | cleanLyric}}</p>
        </div>
        <audio
            id="music-player-audio"
            ref="music-player-audio"
            @loadedmetadata="audioLoadedmetadata"
            @timeupdate="audioTimeupdate"
            @ended="audioEnded"
        >
            Your browser does not support the
            <code>audio</code> element.
            <source
                v-if="currentMusic"
                id="music-player-audio-source"
                :src="currentMusic.playUrl"
                :type="currentMusic.type"
            />
        </audio>
    </div>
</template>

<script>
    import MyDate from '../package/util/date.js'

    export default {
        name: 'MusicPlayer',
        props: {
            list: {
                type: Array,
                default: () => ([])
            },
            defaultPic: String,
            index: {
                type: Number
            }
        },
        data () {
            return {
                PlayIndex: 0,
                isPlay: false,
                isLoop: false,
                isMuted: false,
                audioEL: null,
                currentTime: 0,
                duration: 0,
                audioVolume: 50,
                lyric: [],
                lyricindex: 10
            }
        },
        computed: {
            currentMusic () {
                if (!this.list || !this.list[ this.PlayIndex ]) {
                    return null
                }
                return this.list[ this.PlayIndex ]
            },
            propressDoneWidth () {
                return this.currentTime / this.duration * 100 + '%'
            },
            soundDoneHeight () {
                return this.audioVolume + '%'
            },
            moduleClass () {
                return this.isLoop ? 'el-icon-refresh' : 'el-icon-sort'
            },
            nowLyric () {
                if (!this.list.length) {
                    return []
                }
                if ('lyric' in this.list[ this.PlayIndex ]) {
                    return this.lyric.slice(this.lyricindex - 10, this.lyricindex)
                }
                return []
            }
        },
        watch: {
            index () {
                const audio = this.$refs[ 'music-player-audio' ]
                this.PlayIndex = this.index
                try {
                    audio.load()
                    audio.play()
                } catch (error) {
                    console.error(error)
                }
                this.isPlay = true
            },
            list (newVal, oldVal) {
                if (this.list.length === 1) {
                    this.isPlay = true
                    return
                }
                const length = this.list.length
                if (length > this.songLength) {
                    this.PlayIndex = length - 1
                    try {
                        this.audioEL.load()
                        this.audioEL.play()
                    } catch (error) {
                        console.error(error)
                    }
                    this.isPlay = true
                }
            },
            isPlay (newVal) {
                try {
                    if (newVal && this.audioEL) {
                        this.audioEL.load()
                        this.audioEL.play()
                    }
                } catch (error) {
                    console.error(error)
                }
            },
            isMuted (newVal, oldVal) {
                if (!typeof newVal === 'boolean') {
                    throw new TypeError('the type of isMuted must be boolean')
                }
                this.audioEL.muted = newVal
            },
            audioVolume (newVal, oldVal) {
                this.audioEL.volume = newVal / 100
            }
        },
        filters: {
            cleanLyric (val) {
                if (!val) {
                    return ''
                }
                const newVal = val.split(']')[ 1 ] || val.split(']')[ 0 ].split(':')[ 1 ]
                return newVal
            },
            sec2min (val) {
                return MyDate.sec2min(val)
            }
        },
        mounted () {
            this.progress = this.$refs[ 'music-player-progress' ]
            this.controlGroup = this.$refs[ 'music-player-controlGroup' ]
            this.audioEL = this.$refs[ 'music-player-audio' ]
            console.log('audioEL', this.audioEL)

            this.songLength = this.list.length
            // let soundBox = document.getElementsByClassName("music-player-sound-box")[0];
            // let point = document.getElementById("music-player-propress-point");
            // let soundPoint = document.getElementById("music-player-sound-point");
            // let propressDone = document.getElementById("music-player-propress-done");
            // let soundDone = document.getElementById("music-player-sound-done");
        },
        methods: {
            // 播放控制及歌曲切换
            switchMusic () {
                if (!this.list.length) {
                    return
                }
                if (this.audioEL.paused) {
                    this.audioEL.play()
                    this.isPlay = true
                } else {
                    this.audioEL.pause()
                    this.isPlay = false
                }
            },
            switchSong (mode = 1) {
                // 切换歌曲[1下一首] [-1 上一首]
                if (mode !== 1 && mode !== -1) return
                if (!this.list[ this.PlayIndex + mode ]) {
                    const msg = mode === 1 ? '没有下一首了...' : '没有上一首了...'
                    this.$root.$message(msg)
                    return
                }
                this.PlayIndex = this.PlayIndex + mode
                this.audioEL.load()
                this.audioEL.play()
                this.isPlay = true
            },
            // 播放模式
            changeModule () {
                this.isLoop = !this.isLoop
                this.audioEL.loop = this.isLoop
            },
            clickPropress (e) {
                if (!this.list.length) {
                    return
                }
                this.currentTime = e.layerX / 285 * this.duration
                this.audioEL.currentTime = this.currentTime
            },
            // 音量控制
            soundSwitch () {
                this.isMuted = !this.isMuted
            },
            // 音量控制
            dragSound (event) {
                event = event || window.event
                var pageY = event.pageY || this.scroll().top + event.clientY
                var yy = this.controlGroup.offsetTop
                var targety = pageY - yy
                if (targety >= 0 && targety <= 100) {
                    const audioVolume = 100 - targety
                    this.audioVolume = audioVolume
                    this.isMuted = false
                }
            },
            // 音频加载完毕
            audioLoadedmetadata (event) {
                console.log('event', event)
                
                if ('lyric' in this.list[ this.PlayIndex ]) {
                    this.lyric = this.list[ this.PlayIndex ].lyric.split('\n')
                    this.lyricindex = 10
                }
            },
            audioTimeupdate (event) {
                this.duration = event.target.duration
                this.currentTime = event.target.currentTime
                if (!this.nowLyric.length) return

                // 歌词更新
                if ('lyric' in this.list[ this.PlayIndex ]) {
                    const sec5 = MyDate.lyricTime2Sec(this.nowLyric[ 5 ]).sec
                    if (sec5 <= this.currentTime && this.lyricindex <= this.lyric.length) {
                        this.lyricindex += 1
                    }
                }
            },
            // 歌曲播放结束
            audioEnded (event) {
                const isLoop = event.target.loop
                this.isPlay = false
                if (!isLoop && this.list[ this.PlayIndex + 1 ]) {
                    this.PlayIndex += 1
                    this.lyricindex = 10
                    event.target.load()
                    event.target.play()
                    this.isPlay = true
                }
            },
            // 进度条拖拽
            dragPropress (event) {
                if (!this.list.length) {
                    return
                }
                const width = event.target.offsetParent.offsetParent.offsetWidth
                // 获取指针在元素内的位置targetx;
                event = event || window.event
                const pagex = event.pageX || scroll().left + event.clientX
                const xx = this.progress.offsetLeft
                const targetx = pagex - xx
                if (targetx > 30 && targetx <= width) {
                    this.currentTime = targetx / width * this.duration
                    const sec3 = MyDate.lyricTime2Sec(this.nowLyric[ 3 ]).sec
                    const sec5 = MyDate.lyricTime2Sec(this.nowLyric[ 5 ]).sec
                    if (sec3 > this.currentTime && this.lyricindex > 0) {
                        this.lyricindex -= 1
                    } else if (
                        sec5 < this.currentTime &&
                        this.lyricindex <= this.lyric.length - 1
                    ) {
                        this.lyricindex += 1
                    }
                }
            },
            dragendPropress (event) {
                if (!this.list.length) {
                    return
                }
                const width = event.target.offsetParent.offsetParent.offsetWidth
                event = event || window.event
                const pagex = event.pageX || scroll().left + event.clientX
                const xx = this.progress.offsetLeft
                let targetx = pagex - xx
                if (targetx < 0) {
                    targetx = 0
                }
                if (targetx > width) {
                    targetx = width
                }
                const currentTime = targetx / width * this.duration
                this.currentTime = currentTime
                this.audioEL.currentTime = currentTime
            },
            preventIcon () {
                document.ondragover = e => {
                    e.preventDefault()
                }
            },
            scroll () {
                if (window.pageYOffset != null) {
                    // ie9+ 高版本浏览器
                    // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
                    return {
                        left: window.pageXOffset,
                        top: window.pageYOffset
                    }
                } else if (document.compatMode === 'CSS1Compat') {
                    // 标准浏览器   来判断有没有声明DTD
                    return {
                        left: document.documentElement.scrollLeft,
                        top: document.documentElement.scrollTop
                    }
                }
                return {
                    // 未声明 DTD
                    left: document.body.scrollLeft,
                    top: document.body.scrollTop
                }
            }
        }
    }
</script>
