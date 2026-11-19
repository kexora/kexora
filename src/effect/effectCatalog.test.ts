import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KEXORA_EFFECT_LIST,
  computeBlurKexFrames,
} from './effectCatalog';

test('KEXORA_EFFECT_LIST contains blurkex slow-motion preset', () => {
  assert.ok(KEXORA_EFFECT_LIST.blurkex);
  assert.equal(KEXORA_EFFECT_LIST.blurkex.id, 'blurkex');
  assert.equal(typeof KEXORA_EFFECT_LIST.blurkex.duration, 'number');
  assert.ok(KEXORA_EFFECT_LIST.blurkex.blurPx >= 10);
});

test('computeBlurKexFrames generates initial blur + slide and clean animate state', () => {
  const frames = computeBlurKexFrames({
    effect: 'blurkex',
    direction: 'up',
    staggerIndex: 2,
    staggerStep: 0.1,
  });

  assert.equal(frames.initial.opacity, 0);
  assert.equal(frames.initial.filter, 'blur(14px)');
  assert.equal(frames.initial.y, 32);
  assert.equal(frames.animate.opacity, 1);
  assert.equal(frames.animate.filter, 'blur(0px)');
  assert.equal(frames.animate.y, 0);
  assert.equal(frames.transition.delay, 0.2);
});

test('computeBlurKexFrames handles directional slide axes accurately', () => {
  const left = computeBlurKexFrames({ direction: 'left', distance: 24 });
  assert.equal(left.initial.x, 24);
  assert.equal(left.initial.y, 0);

  const right = computeBlurKexFrames({ direction: 'right', distance: 24 });
  assert.equal(right.initial.x, -24);
  assert.equal(right.initial.y, 0);
});
