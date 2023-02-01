<script lang="ts">
import { Command, println } from "./ConsoleCommands"

export default {
    name: "Console",
    data() {
        return {
            commandIn: "",
            output: [">>Under Construction<<"] as string[],
            screenWidth: 80,
            ignoredKeys: [
                9,//tab
                16, 17, 18, 20,//modifier keys
                35, 36, 37, 39,//arrow and navigation
                112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,//function keys
                144//num lock
            ],
        }
    },
    created() {
        document.onkeydown = this.keyTyped;
    },
    computed: {
        commands(): Map<string, Command> {
            return new Map<string, Command>([
                [
                    'hello',
                    {
                        doc: (p: println): void => {
                            p("Hello World!")
                        },
                        cmd: (args: string[], p: println): void => {
                            p("Hello");
                            p("World!");
                            for (var a in args) {
                                p(a);
                            }
                        }
                    }
                ]
            ])
        }
    },
    methods: {
        keyTyped: function (event: any) {
            for (var i = 0; i < this.ignoredKeys.length; i++) {
                if (event.keyCode == this.ignoredKeys[i]) {
                    return;
                }
            }
            if (event.keyCode === 32) {
                //space
                event.preventDefault();
            }
            if (event.keyCode === 8) {
                //backspace
                this.commandIn = this.commandIn.slice(0, -1);
            } else if (event.keyCode === 13) {
                //enter
                this.output.push(this.commandIn);
                this.commandIn = "";
            } else if (event.keyCode === 33) {
                //page up
            } else if (event.keyCode === 34) {
                //page down
            } else if (event.keyCode === 38) {
                //arrow up
            } else if (event.keyCode === 40) {
                //arrow down
            } else {
                if (this.commandIn.length < this.screenWidth) {
                    this.commandIn += event.key;
                }
            }
        }
    }
}
</script>
<template>
    <div class="console">
        <div class="line-overlay"></div>
        <div class="console-text">
            JBLv0.8<br>
            <div v-for="(line, i) in output" :key="i">
                {{ line }}
            </div>
            {{ commandIn }}
            <span class="blinky-boi">&#8248;</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
body {
    overflow: hidden;
    background: black;
}

$color: #16d416;

.console {
    max-width: 837px;
    max-height: 528px;
    font: 1.1rem Inconsolata, monospace;
    text-shadow: 0 0 5px lighten($color, 30%);
    color: $color;
    position: relative;
    background-color: black;
    height: 100vh;
    margin: 0;
    overflow: hidden;
    background: darken($color, 50%);
    background-image: radial-gradient(darken($color, 30%), black 120%);
    -webkit-animation-name: console-text-anim;
    -webkit-animation-duration: 0.08s;
    animation-name: console-text-anim;
    animation-duration: 0.08s;
    animation-iteration-count: infinite;

    .command-in {
        float: left;
        margin-left: -1000px;
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
    }

    &::selection {
        background: #0080FF;
        text-shadow: none;
    }

    pre {
        margin: 0;
    }

    .line-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px);
    }

    .console-text {
        display: block;
        padding: 2rem;
    }

    .blinky-boi {
        animation: blink-cursor 1s step-start infinite;

        @keyframes blink-cursor {
            50% {
                opacity: 0;
            }
        }
    }
}

@-webkit-keyframes console-text-anim {
    0% {
        color: $color;
    }

    50% {
        color: darken($color, 10%);
    }

    100% {
        color: $color;
    }
}

@keyframes console-text-anim {
    0% {
        color: $color;
    }

    50% {
        color: darken($color, 10%);
    }

    100% {
        color: $color;
    }
}
</style>
