(function() {
    var Ext = window.Ext4 || window.Ext;

    /**
     * @private
     * Utility methods for dealing with users
     */
    Ext.define('Niks.apps.TreeStoreBuilder', {
        extend: 'Rally.data.wsapi.TreeStoreBuilder',
             
        loadModels: function(config) {
            console.log('loading mapper');
            if (!config.mapper) {
                config.mapper = Ext.create('Niks.apps.ParentChildMapper');
            }

            return this.callParent([config]).then({
                success: function(models) {
                    return config.mapper.initDynamicTypesIfRequired(models, config.context).then({
                        success: function() {
                            return this._setupTreeModel(this._getComponentModels(models), config);
                        },
                        scope: this
                    });
                },
                scope: this
            });
        },

    });
})();