new Vue({
    el: "#app",
    data: {
        times: [],
        animateFrame: 0,
        nowTime: 0,
        diffTime: 0,
        startTime: 0,
        isRunning: false
    },
    methods: {
        // 現在時刻から引数に渡した数値を startTime に代入
        setSubstractStartTime(getTime) {
            const time = typeof getTime !== "undefined" ? getTime : 0

            this.startTime = Math.floor(performance.now() - time)
        },
        // タイマーをスタートさせる
        startTimer() {
            // loop() 内で this の値が変更されるので退避
            var vm = this

            vm.isRunning = true
            vm.setSubstractStartTime(vm.diffTime)

            // ループ処理
            (function loop() {
                vm.nowTime = Math.floor(performance.now())
                vm.diffTime = vm.nowTime - vm.startTime
                vm.animateFrame = requestAnimationFrame(loop)
            }());
        },
        // タイマーを停止させる
        stopTimer() {
            this.isRunning = false
            cancelAnimationFrame(this.animateFrame)
        },
        // 初期化
        clearAll() {
            this.startTime = 0
            this.nowTIme = 0
            this.diffTime = 0
            this.times = []
            this.stopTimer()
            this.animateFrame = 0
        }
    },
    computed: {
        // 時間を計算
        hours() {
            return Math.floor(this.diffTime / 1000 / 60 / 60)
        },
        // 分を計算（60 分になったら 0 分に戻る）
        minutes() {
            return Math.floor(this.diffTime / 1000 / 60) % 60
        },
        // 秒を計算（60 秒になったら 0 秒に戻る）
        seconds() {
            return Math.floor(this.diffTime / 1000) % 60
        },
        // ミリ秒を計算（1000 ミリ秒になったら 0 秒に戻る）
        milliSeconds() {
            return Math.floor(this.diffTime % 1000)
        }
    },
    filters: {
        // ゼロ埋めフィルター　引数に桁数を入力する
        // * String.prototype.padStart() は IE じゃ使えない
        zeroPad(value, getNum) {
            const num = typeof getNum !== 'undefined' ? getNum : 2

            return value.toString().padStart(num, '0')
        }
    }
})