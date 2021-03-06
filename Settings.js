(function () {
    var Ext = window.Ext4 || window.Ext;

    var getHiddenFieldConfig = function (name) {
        return {
            name: name,
            xtype: 'rallytextfield',
            hidden: true,
            handlesEvents: {
                typeselected: function () {
                    this.setValue(null);
                }
            }
        };
    };

    Ext.define('Niks.apps.Settings', {
        singleton: true,
        requires: [
            'Rally.ui.combobox.FieldComboBox',
            'Rally.ui.combobox.ComboBox',
            'Rally.ui.CheckboxField'
        ],

        getFields: function (app) {
            this.app = app;
            return [
                {
                    name: 'type',
                    xtype: 'rallycombobox',
                    allowBlank: false,
                    autoSelect: false,
                    shouldRespondToScopeChange: true,
                    context: this.app.getContext(),
                    initialValue: 'HierarchicalRequirement',
                    storeConfig: {
                        model: Ext.identityFn('TypeDefinition'),
                        sorters: [{ property: 'DisplayName' }],
                        fetch: ['DisplayName', 'ElementName', 'TypePath', 'Parent', 'UserListable'],
                        filters: [{ property: 'UserListable', value: true }],
                        autoLoad: false,
                        remoteSort: false,
                        remoteFilter: true
                    },
                    displayField: 'DisplayName',
                    valueField: 'TypePath',
                    listeners: {
                        select: function (combo) {
                            this.app.clearFiltersAndSharedViews();
                            combo.fireEvent('typeselected', combo.getRecord().get('TypePath'), combo.context);
                        },
                        scope: this
                    },
                    bubbleEvents: ['typeselected'],
                    readyEvent: 'ready',
                    handlesEvents: {
                        projectscopechanged: function (context) {
                            this.refreshWithNewContext(context);
                        }
                    }
                },
                { type: 'query' },
                {
                    name: 'showControls',
                    xtype: 'rallycheckboxfield',
                    fieldLabel: 'Show Control Bar'
                },
                getHiddenFieldConfig('columnNames'),
                getHiddenFieldConfig('order')
            ];
        }
    });
})();
