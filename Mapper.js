(function() {
    var Ext = window.Ext4 || window.Ext;

    /**
     * @private
     *
     * Maps parent/child properties of hierarchical collection attributes.
     */
    Ext.define('Niks.apps.ParentChildMapper', {
        extend: Rally.data.wsapi.ParentChildMapper,
        parentChildTypeMap: null,

        constructor: function() {
            this.parentChildTypeMap = {
                //Only possible dependency of a user story is another user story.
                //Due to the 'funny' in sdk.js, add the defect in as well.... can't hurt....
                hierarchicalrequirement: [
                   {typePath: 'defect', collectionName: 'Defects', parentField: 'Requirement'},
                    {typePath: 'hierarchicalrequirement', collectionName: 'Successors', parentField: 'Predecessors'}
                ],
                // milestone: [
                //     {typePath: 'artifact', collectionName: 'Artifacts', parentField: 'Milestones'},
                // ],
                //Don't know why this one is here, but leave it for now
                attributedefinition: [
                    {typePath: 'allowedattributevalue', collectionName: 'AllowedValues', parentField: 'AttributeDefinition'}
                ]
            };
        },
        _mergePortfolioItemType: function(typeDef, portfolioItemsByOrdinal) {
            var typePath = typeDef.TypePath.toLowerCase();
            this.parentChildTypeMap[typePath] = [
                {typePath: typePath, collectionName: 'Successors', parentField: 'Predecessors'},
                //There is a 'funny' in another bit of code that means I need to do this....
                // I have to check in the sdk.js file to find where it is....
               {typePath: 'testcase', collectionName: 'Successors', parentField: 'Predecessors'}
            ];
        }
    });
})();