import Application from '@ember/application';
import { run } from '@ember/runloop';
import { initialize } from 'nypr-playlist/instance-initializers/pym';
import { module } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import test from 'ember-sinon-qunit/test-support/test';
import pym from 'pym';

module('Unit | Instance Initializer | pym', function(hooks) {
  hooks.beforeEach(function() {
    run(() => {
      this.application = Application.create();
      this.appInstance = this.application.buildInstance();
    });
  });

  hooks.afterEach(function() {
    run(this.appInstance, 'destroy');
    destroyApp(this.application);
  });

  test('it registers pym on all controllers', function() {
    this.mock(pym).expects('Child').once().withArgs({polling: 200});
    this.mock(this.appInstance).expects('register').once().withArgs('pym:main', {}, {instantiate: false});
    this.mock(this.appInstance).expects('inject').once().withArgs('controller', 'pym', 'pym:main');

    initialize(this.appInstance);
  });
});