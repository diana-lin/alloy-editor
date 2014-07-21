YUI.add('button-image', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonImage class provides functionality for changing the alignment of an image.
     *
     * @class Y.ButtonImage
     */

    /**
     * Fired when an image file is added as an element in the editor.
     *
     * @event imageadd
     * @param {CKEDITOR.dom.element} el The created img element in editor.
     */
    var BtnImage = Y.Base.create('image', Y.Plugin.Base, [Y.ButtonBase], {
        /**
         * Creates an input element of type "file" if not already created and registers
         * an event on input value change.
         *
         * @method _getInputFile
         * @protected
         */
        _getInputFile: function() {
            var id,
                inputFile;

            inputFile = this._inputFile;

            if (!inputFile) {
                id = Y.guid();

                Y.one('body').prepend('<input type="file" id="' + id + '"  style="display: none;"></input>');

                inputFile = Y.one('#' + id);

                inputFile.on('change', this._onInputChange, this);

                this._inputFile = inputFile;
            }

            return inputFile;
        },

        /**
         * Simulates "click" event on the input field when user presses the button. This
         * triggers the native open file dialog from the browser. This method works on IE9+.
         *
         * @method _onClick
         * @protected
         */
        _onClick: function() {
            var inputFile = this._getInputFile();

            inputFile.simulate('click');
        },

        /**
         * On input change, reads the chosen file and creates an img element with src as Data URI.
         * Then, fires an {{#crossLink "Y.ButtonImage/imageadd:event"}}{{/crossLink}} via CKEditor
         * message system.
         *
         * @method _onInputChange
         * @protected
         */
        _onInputChange: function() {
            var instance = this,
                editor,
                inputFile,
                el,
                reader;

            reader = new FileReader();

            reader.onload = function(event) {
                editor = instance.get('host').get('editor');

                el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');

                editor.insertElement(el);

                editor.fire('imageadd', el);
            };

            inputFile = this._inputFile;

            reader.readAsDataURL(inputFile.getDOMNode().files[0]);

            inputFile.set('value', '');
        },

        TPL_CONTENT: '<i class="alloy-editor-icon-image"></i>'
    }, {
        NAME: 'image',

        NS: 'image',

        ATTRS: {
            /**
             * Specifies if this button will be toggleable, or not.
             * ButtonImage will be not toggleable by default.
             *
             * @attribute toggle
             * @default false
             * @type Boolean
             */
            toggle: {
                validator: Lang.isBoolean,
                value: false,
                writeOnce: 'initOnly'
            }
        }
    });

    Y.ButtonImage = BtnImage;

}, '', {
    requires: ['button-base', 'node-event-simulate']
});