YUI.add('button-h1', function(Y) {
    'use strict';

    var Lang = Y.Lang;

    /**
     * The ButtonH1 class provides functionality for applying HTML heading, level 1
     * to the selection.
     *
     * @class Y.ButtonH1
     */
    var H1 = Y.Base.create('h1', Y.Plugin.Base, [Y.ButtonBase], {
        TPL_CONTENT: '<i class="alloy-editor-icon-h1"></i>'
    }, {
        NAME: 'h1',

        NS: 'h1',

        ATTRS: {
            /**
             * Specifies the element (style) which this button handles.
             *
             * @attribute element
             * @default 'h1'
             * @type String
             */
            element: {
                validator: Lang.isString,
                value: 'h1'
            }
        }
    });

    Y.ButtonH1 = H1;

}, '', {
    requires: ['button-base']
});