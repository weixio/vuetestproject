<template>
    <div>

    </div>

</template>

<script>
    export default {
        name: "FileUpload",
        methods:{
            // 替换模块
            upload: () => {
                return this.filePicker().then((result) => {
                    const { files } = result;
                    if (files) {
                        if (/\.psd/.test(files[0].name)) {
                            // replace PSDFile
                            return this.addPSDFile(result.files[0], {
                                action: 'replace',
                            });
                        }
                        return this.$notice('error', '请选择PSD文件！', { isMask: false, timeout: 1600 });
                    }
                    return false;
                });
            },

            filePicker(options = { accept: '*/*', multiple: false }) {
                const bodyElement = document.body;
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', options.accept);
                input.setAttribute('multiple', options.multiple);
                input.style.cssText = 'position:absolute; overflow:hidden; width:0; height: 0; opacity: 0;';

                return new Promise((resolve) => {
                    input.onchange = function onchange(e) {
                        const { files } = e.target;

                        // After select a file
                        if (options.afterSelect) {
                            options.afterSelect(input);
                        }

                        if (files.length) {
                            resolve({
                                input: this,
                                files,
                                event: e,
                            });
                        }
                    };
                    bodyElement.appendChild(input);
                    input.click();

                    // remove input element after close dialog!
                    const checkCloseDialog = function checkCloseDialog() {
                        bodyElement.removeEventListener('mousemove', checkCloseDialog, true);
                        input.parentNode.removeChild(input);
                    };
                    bodyElement.addEventListener('mousemove', checkCloseDialog, true);
                });
            },

        }
    }
</script>

<style scoped>

</style>
