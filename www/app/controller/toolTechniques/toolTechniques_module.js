angular.module('toolTechniques.module', ['toolTechniques.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('toolTechniques', {
        url: '/toolTechniques',
        templateUrl: 'views/toolTechniques.html',
        controller: 'toolTechniques.controller',
    })
});