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

  test('it registers pym on all controllers', function(assert) {
    let childStub = this.stub(pym, 'Child');
    let registerSpy = this.spy(this.appInstance, 'register');
    let injectSpy = this.spy(this.appInstance, 'inject');

    initialize(this.appInstance);

    assert.ok(childStub.calledWith({polling: 200}), 'embed is created');
    assert.ok(registerSpy.calledWith('pym:main', {}, {instantiate: false}), 'embed is registered');
    assert.ok(injectSpy.calledWith('controller', 'pym', 'pym:main'), 'registers on controllers');
  });
});
